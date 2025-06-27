
const Header = ({ id, text, containerClass }) => {
  return (
    <h1 id={id} className={`text-[11vw] font-abcwhyteplus uppercase leading-[0.75] tracking-[-0.04em] ${containerClass}`}>{text}</h1>
  )
}

export default Header