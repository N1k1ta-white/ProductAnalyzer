import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

type Props = {}

export default function Settings({}: Props) {
  const user = useSelector((state: RootState) => state.authData.user);
  return (
    <div>{user?.id}</div>
  )
}