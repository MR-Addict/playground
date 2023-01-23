import Image from "next/image";
import dinosaur from "./dinosaur.png";

export default function Dinosaur() {
  return (
    <div>
      <Image src={dinosaur} alt='dinosaur' className='w-full max-w-xs' />
    </div>
  );
}
