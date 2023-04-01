function H1(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h1 {...props} className='text-3xl font-bold py-3 my-4 text-gray-900 border-b-2 border-gray-200'>
      {props.children}
    </h1>
  );
}

function H2(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h2 {...props} className='text-2xl font-bold py-3 my-4 text-gray-800 border-b-2 border-gray-200'>
      {props.children}
    </h2>
  );
}

function H3(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h3 {...props} className='text-xl font-semibold py-3 my-4 text-gray-700'>
      {props.children}
    </h3>
  );
}

function H4(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h4 {...props} className='text-lg font-semibold py-3 my-4 text-gray-700'>
      {props.children}
    </h4>
  );
}

function H5(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h5 {...props} className='text-base font-semibold py-3 my-4 text-gray-700'>
      {props.children}
    </h5>
  );
}

function H6(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h6 {...props} className='text-base font-semibold py-3 my-4 text-gray-700'>
      {props.children}
    </h6>
  );
}

const Heading = { H1, H2, H3, H4, H5, H6 };

export default Heading;
