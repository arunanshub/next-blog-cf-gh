"use server"

export async function finder() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    message: "hello world",
    random: Math.random(),
  }
}
