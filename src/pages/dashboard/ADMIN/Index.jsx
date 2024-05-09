import { useEffect } from "react"

const Index = () => {

  const token = localStorage.getItem("token")

console.log(token);
  return (
    <div>Index_Admin</div>
  )
}

export default Index