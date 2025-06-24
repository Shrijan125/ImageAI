import React from 'react';
import { Button } from './ui/button';

interface PackCardProps {
  imgUrl: string;
  selected?: boolean;
  name: string;
  description: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}

const PackCard: React.FC<PackCardProps> = ({
  imgUrl,
  setSelected,
  name,
  description,
  id,
}) => {
  return (
    <div
      onClick={() => {
        setSelected(id);
      }}
      className={`relative border-[1px] rounded-md sm:w-[90%] w-full h-[500px] overflow-hidden border-white/30 hover:backdrop-blur-2xl hover:shadow-2xl hover:shadow-primary/30 group transition-all duration-300`}
    >
      <img
        alt="pack_thumbnail"
        className="object-cover object-top group-hover:scale-[1.02] transition-all duration-300  h-[70%] w-full"
        src={imgUrl}
      ></img>
      <div className="flex flex-col justify-between h-[30%]">
        <div className="flex flex-col gap-1 p-4">
          <div>{name}</div>
          <p className="text-sm text-secondary-text">
            {description.length > 50
              ? description?.substring(0, 50) + '...'
              : description}
          </p>
        </div>
        <Button className="m-4 hover:cursor-pointer">Generate Image</Button>
      </div>
    </div>
  );
};

export default PackCard;
