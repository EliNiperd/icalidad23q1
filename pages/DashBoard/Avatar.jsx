import Image from 'next/image';
import avatarImage from '@/public/photo-Avatar1.jpg';

const Avatar = ({ userImage }) => {
  return (
    <>
      <div className="avatar online relative">
        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1 relative">
          <Image
            src={avatarImage}
            alt="Avatar"
            className="rounded-full relative w-12 h-12"
          ></Image>
        </div>
      </div>
    </>
  );
};

export default Avatar;

// .color1 { #34acec };
// .color2 { #99d4f4 };
// .color3 { #0b5379 };
// .color4 { #7aa9c4 };
// .color5 { #acacbc };
