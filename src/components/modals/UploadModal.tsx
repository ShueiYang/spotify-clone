"use client";

import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { createBrowserSupabaseClient } from "@/supabase/utils/client";
import { useUploadModal } from "@/hooks/useUploadModal";
import { useUserStore } from "@/hooks/useUserStore";
import { UploadForm } from "@/types/custom.types";

import { Modal } from "./Modal";
import InputForm from "@/components/customInputs/InputForm";
import Button from "@/components/customButtons/Button";

export function UploadModal() {
  const router = useRouter();
  const isOpen = useUploadModal((state) => state.isOpen);
  const onClose = useUploadModal((state) => state.onClose);
  const user = useUserStore((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UploadForm>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  function onChange(open: boolean) {
    if (!open) {
      reset();
      onClose();
    }
  }

  async function onSubmit(values: UploadForm) {
    const supabase = createBrowserSupabaseClient();
    try {
      const songFile = values.song?.[0];
      const imageFile = values.image?.[0];

      if (!songFile || !imageFile || !user) {
        return toast.error("Missing parameter");
      }
      const uniqueID = nanoid(8);

      // upload song
      const { data: songData, error: songError } = await supabase.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        return toast.error("Failed to upload song");
      }

      // upload image
      const { data: imageData, error: imageError } = await supabase.storage
        .from("images")
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) {
        return toast.error("Failed to upload image");
      }

      const { error: supabaseError } = await supabase.from("songs").insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path,
      });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      router.refresh();
      toast.success("Song successfully created!");
      reset();
      onClose();
    } catch (err) {
      console.error("ErrorSubmit", err);
      toast.error("Something went wrong");
    }
  }

  return (
    <Modal
      title="Add a song"
      description="Upload an MP3 file"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <InputForm
          id="title"
          disabled={isSubmitting}
          {...register("title", { required: true })}
          placeholder="Song title"
          error={errors.title}
        />
        <InputForm
          id="author"
          disabled={isSubmitting}
          {...register("author", { required: true })}
          placeholder="Song author"
          error={errors.author}
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <InputForm
            id="song"
            type="file"
            disabled={isSubmitting}
            {...register("song", { required: true })}
            accept=".mp3"
            error={errors.song}
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <InputForm
            id="image"
            type="file"
            disabled={isSubmitting}
            {...register("image", { required: true })}
            accept="image/*"
            error={errors.image}
          />
        </div>
        <Button
          type="submit"
          className="mt-2 font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Uploading..." : "Create"}
        </Button>
      </form>
    </Modal>
  );
}
