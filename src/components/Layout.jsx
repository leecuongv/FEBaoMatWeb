
function Layout(props) {
  return (
    <>
    <a><span 
      className='imgHero'>
        </span></a>
    
      <div className="main">
        <div className="container">
          {props.children}
        </div>
      </div>
           
    </>
  )
}

export default Layout