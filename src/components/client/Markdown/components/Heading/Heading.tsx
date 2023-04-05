function H1(props: React.ComponentProps<"h1">) {
  return (
    <h1 {...props} className='text-3xl font-bold py-3 my-4 text-gray-900 border-b-2 border-gray-300'>
      {props.children}
    </h1>
  );
}

function H2(props: React.ComponentProps<"h2">) {
  return (
    <h2 {...props} className='text-2xl font-bold py-3 my-4 text-gray-800 border-b-2 border-gray-300'>
      {props.children}
    </h2>
  );
}

function H3(props: React.ComponentProps<"h3">) {
  return (
    <h3 {...props} className='text-xl font-semibold py-3 my-4 text-gray-700'>
      {props.children}
    </h3>
  );
}

function H4(props: React.ComponentProps<"h4">) {
  return (
    <h4 {...props} className='text-lg font-semibold py-3 my-4 text-gray-700'>
      {props.children}
    </h4>
  );
}

function H5(props: React.ComponentProps<"h5">) {
  return (
    <h5 {...props} className='text-base font-semibold py-3 my-4 text-gray-700'>
      {props.children}
    </h5>
  );
}

function H6(props: React.ComponentProps<"h6">) {
  return (
    <h6 {...props} className='text-base font-semibold py-3 my-4 text-gray-700'>
      {props.children}
    </h6>
  );
}

const Heading = { H1, H2, H3, H4, H5, H6 };

export default Heading;
