import { UserCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const ModelCard = ({
  imgUrl,
  selected = false,
  name,
  setSelected,
  id,
}: {
  imgUrl: string | null;
  selected?: boolean;
  name: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}) => {
  return (
    <div
      onClick={() => {
        setSelected(id);
      }}
      className={`${selected && 'border-2'} relative ${selected && 'border-white'} rounded-md w-[90%] h-[300px] overflow-hidden`}
    >
      {imgUrl ? (
        <Image
          alt="model_thumbnail"
          className="object-cover"
          fill
          src={imgUrl}
        ></Image>
      ) : (
        <div className="bg-gray-700 items-center h-full w-full flex justify-center">
          {' '}
          <UserCircle className="size-32" strokeWidth={1}></UserCircle>{' '}
        </div>
      )}
      <div className="absolute bottom-5 left-5">{name}</div>
    </div>
  );
};

export default ModelCard;
