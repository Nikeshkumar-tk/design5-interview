import { usePosts } from "@/hooks/usePosts"
import React from "react"
import { useSearchParams } from "react-router-dom"
import { AddPost } from "./add-post"
import { PageHeader, PageHeaderHeading } from "./page-header"
import { Shell } from "./shells/shell"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"

export const Posts = () => {
    const [searchParam, setSearchParam] = useSearchParams({ q: "" })
    const { posts, loading } = usePosts(searchParam.get("q")!)
    const handleFiltering = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParam({ q: e.target.value })
    }
    return (
        <Shell>
            <PageHeader>
                <PageHeaderHeading>Explore posts</PageHeaderHeading>
            </PageHeader>
            <div className="flex justify-between items-center">
                <Input onChange={handleFiltering} placeholder="Search posts" className="max-w-lg" />
                <AddPost />
            </div>
            {loading && <p>Loading posts...</p>}
            <div className="grid grid-cols-4 gap-2">
                {posts.map(post => (
                    <Card>
                        <CardHeader>
                            <CardTitle>{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {post.body}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Shell>
    )
}