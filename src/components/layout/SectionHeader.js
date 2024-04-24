

export default function SectionHeader({subHeader, mainHeader}) {
    return (
      <>
       <h3 className="text-gray-500 font-semibold uppercase leading-4">{subHeader}</h3>
              <h2 className="text-red-500 text-4xl font-semibold italic">{mainHeader}</h2>
      </>
    );
  }
  