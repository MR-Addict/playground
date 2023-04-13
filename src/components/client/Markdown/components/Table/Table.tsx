import style from "./Table.module.css";

export default function Table(props: React.ComponentProps<"table">) {
  return (
    <section className='w-full overflow-auto'>
      <table {...props} className={style.table}>
        {props.children}
      </table>
    </section>
  );
}
