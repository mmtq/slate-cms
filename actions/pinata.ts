'use server'

import { pinata } from "@/utils/pinata-config"

export async function getTemporaryURL() {
  try {
    const url = await pinata.upload.public.createSignedURL({
      expires: 30, // in seconds
    })
    console.log("Generated signed URL:", url)
    return { url }
  } catch (error) {
    console.error("Error creating signed URL:", error)
    throw new Error("Failed to generate upload URL")
  }
}
