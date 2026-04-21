export const SubLinksBox = (props) => {
  const { subLinks, extraLinks } = props;

  return (
    <div className="absolute top-10 bg-white hidden group-hover:flex rounded-xl">
      <ul className="p-2 flex-col">
        {subLinks?.map((subLink) => (
          <li
            key={subLink.name}
            className="hover:bg-gray-100 flex items-center justify-start cursor-pointer font-bold"
          >
            <div
              className={` ml-5 flex items-center justify-center rounded-lg ${subLink?.color}`}
            >
              <div className="text-gray-800">
                {subLink?.icon}
              </div>
            </div>
            <div className="flex flex-col ml-5">
              <p className="text-gray-600 dark:text-gray-200">{subLink?.name}</p>
              <p className="text-gray-400 dark:text-gray-400 text-xs">
                {subLink?.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {extraLinks && (
        <div className="flex">
          <div className="my-auto w-[1px] bg-gray-300" />
          <ul className="p-2">
            {extraLinks.map((extraLink) => (
              <li
                key={extraLink?.name}
                className="p-2 h-10 hover:bg-slate-500 flex items-center justify-start cursor-pointer text-sm font-semibold text-gray-600"
              >
                {extraLink?.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
