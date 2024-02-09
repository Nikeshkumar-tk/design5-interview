import { usePosts } from "@/hooks/usePosts"
import { Navbar } from "@/components/nav-bar"
import { Posts } from "./components/posts"

function App() {
  return (
    <div>
      <Navbar />
      <Posts />
    </div>
  )
}

export default App
