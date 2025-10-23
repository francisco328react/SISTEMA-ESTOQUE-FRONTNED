interface SideImageProps {
  title: string;
}

export const SideImage: React.FC<SideImageProps> = ({ title }) => (
  <div className="hidden md:flex w-1/2 bg-gray-200 items-center justify-center">
    <h1 className="text-3xl font-bold text-gray-700 text-center px-8">{title}</h1>
  </div>
);
