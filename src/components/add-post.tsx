import { Post } from "@/hooks/usePosts"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { useState } from "react"

const addPostSchema = z.object({
    title: z.string({ required_error: "Title is required" }),
    body: z.string().min(10),

})

type AddPostType = z.infer<typeof addPostSchema>

export const AddPost = () => {
    const [isOpen, setIsOpen] = useState(false)
    const form = useForm<AddPostType>({
        resolver: zodResolver(addPostSchema)
    })

    const onSubmit: SubmitHandler<AddPostType> = async (data) => {
        console.log(data)
        const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]") as Post[]
        existingPosts.push({ ...data, id: existingPosts.length + 1, userId: Date.now() })
        localStorage.setItem("posts", JSON.stringify(existingPosts))
        setIsOpen(false)
    }

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger>
                <Button onClick={() => setIsOpen(true)}>Add New</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new post</DialogTitle>
                    <DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter the post title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="body"
                                    render={({ field }) => (
                                        <FormItem className="mt-4">
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input  placeholder="Enter the post body" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end">
                                    <Button className="mt-4" type="submit">Add post</Button>
                                </div>
                            </form>
                        </Form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}