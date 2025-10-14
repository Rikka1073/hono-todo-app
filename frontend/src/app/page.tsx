import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <>
      <div className="items-center p-4">
        <h1 className="text-3xl font-bold underline text-center">Hello, world!</h1>
        <Input type="text" className="mt-4" />
        <Button className="mt-4">登録</Button>
      </div>
    </>
  );
}
