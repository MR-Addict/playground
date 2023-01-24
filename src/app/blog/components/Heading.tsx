function H1(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h1 {...props} className='text-3xl font-bold my-5 text-gray-900'>
      {props.children}
    </h1>
  );
}

function H2(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h2 {...props} className='text-2xl font-semibold my-5 text-gray-800'>
      {props.children}
    </h2>
  );
}

function H3(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h3 {...props} className='text-xl font-semibold my-5 text-gray-700'>
      {props.children}
    </h3>
  );
}

function H4(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h4 {...props} className='font-semibold my-5 text-gray-700'>
      {props.children}
    </h4>
  );
}

const Heading = {
  H1,
  H2,
  H3,
  H4,
};

export default Heading;
