const Filterbar = ({data_filter, clearup}) => {
    
    
    return(
        <div className="filterbox"> 
            {data_filter.role.length > 0  && <div><p>{data_filter.role}</p> <button onClick={()=>clearup("role",data_filter.role)} > <img alt="x" src="images/icon-remove.svg"/></button> </div>}
            {data_filter.level.length > 0  && <div><p>{data_filter.level}</p> <button onClick={()=>clearup("level",data_filter.level)} > <img alt="x" src="images/icon-remove.svg"/></button> </div>}
            {data_filter.languages.length > 0 && data_filter.languages.map((key)=> <div key={"filter_div_for_"+key} ><p>{key}</p> <button onClick={()=>clearup("languages",key)} > <img alt="x" src="images/icon-remove.svg"/></button> </div>  )}
            {data_filter.tools.length > 0 && data_filter.tools.map((key)=> <div  key={"filter_div_for_"+key}><p>{key}</p> <button onClick={()=>clearup("tools",key)} > <img alt="x" src="images/icon-remove.svg"/></button> </div>  )} 
            <a href="#" onClick={()=> clearup(0,0) } >Clear</a>
        </div> 
    ) 
      
}
 
export default Filterbar;