
const Header = ({ id, text, containerClass, sup }) => {
  return (
    <h1 id={id} className={`text-[11vw] font-abcwhyteplus uppercase leading-[0.82] tracking-[-0.04em] relative ${containerClass}`}>
      <span className="sub">{sup}</span>{text}<span className="dot">.</span></h1>
  )
}

export default Header