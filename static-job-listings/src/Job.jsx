const Job = ({data, filter_this}) => { 
    return ( 
        <div className={data.featured ? "job featured": "job"}>
            <div className="profile">
                <img alt={data.company} src={data.logo}/>
                <div className="company"><p>{data.company}</p> {data.new && <div className="new"> NEW! </div>}{data.featured && <div className="featured"> FEATURED</div>} </div>
                <h1 className="position">{data.position} </h1>
                <p className="detail"> {data.postedAt} <span></span> {data.contract} <span></span> {data.location} </p>
            </div>
            <div className="catagories">
                <button onClick={()=> filter_this("role",data.role)} >{data.role}</button>
                <button onClick={()=> filter_this("level",data.level)} >{data.level}</button>
                {data.languages.map((item)=>(
                    <button key={"languagesbtn"+data.id + item} onClick={()=>filter_this("languages",item)} > {item} </button>
                )) }
                {data.tools.map((item)=>(
                    <button key={"toolsbtn"+data.id + item} onClick={()=>filter_this("tools",item) } > {item} </button>
                )) }
            </div>
        </div>
     );
}
 
export default Job;