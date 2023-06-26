import {React,useEffect,useState} from "react";
import { ReactComponent as Search } from "../assets/magnifying-glass-solid.svg";
import { ReactComponent as Down } from "../assets/download-solid.svg";
import "../styles/Activity.css";
import items from '../assets/MOCK_DATA.json';

function Activity() {

    // const []=
    const [selectedItems,setSelectedItems]=useState(items);

    var filter_sadness={"Date":{options:["Last 30 days","Last 90 days"],selected:-1},
    "Type":{options:["Sent","Received"],selected:-1},
    "Status":{options:["failed","completed","pending"],selected:-1}
    }
    
    const [Filters,setFilters]=useState(filter_sadness);
    const [test,settest]=useState("");
                
    // console.log(Object.keys(Filters));

    useEffect(()=>{
        // console.log(Filters);
        filterItems();
        
        
    },[test]);

    function filterDate(item){
        var filter=Filters['Date'];
        if(filter.selected===-1) return true;
        
        var curr_date=new Date();
        curr_date.setHours(0);
        curr_date.setMinutes(0);
        curr_date.setSeconds(0);
        curr_date=curr_date.getTime();

        var cat=filter.options[filter.selected];  // cat => category
        if (cat==="Last 30 days"){
            var item_date=new Date(item.date).getTime();
            return ((curr_date-item_date)<=(1000*60*60*24*30));
        
        }
        else if(cat==="Last 90 days"){
            var item_date=new Date(item.date).getTime();
            return ((curr_date-item_date)<=(1000*60*60*24*90));

        }

    }
    function filterStatus(item){
        var filter=Filters['Status'];
        if(filter.selected===-1) return true;
        var cat=filter.options[filter.selected];  // cat => category
        if (cat==="pending"){
            return (item.status==="pending");            
        }
        else if(cat==="completed"){
            return (item.status==="completed");
        }
        else if(cat==="failed"){
                return (item.status==="failed");
        }
    }
    function filterType(item){
        var filter=Filters['Type'];
        if(filter.selected===-1) return true;
        var cat=filter.options[filter.selected];  // cat => category
        if (cat==="Sent"){
            return (item.type==="sent");
        }
        else if(cat==="Received"){
            return (item.type==="received");
        }
    }

    function filterItems(){
        
        var final_items=items.filter((item)=>{
            return (filterDate(item)&&filterStatus(item)&&filterType(item))
        })
        
        console.log(final_items);
        setSelectedItems(final_items);
    }
    function toggle_options(event){
        event.target?.closest(".filter_btn").querySelector(".options").classList.toggle("hidden");
        
        if(event.target?.hasAttribute("data-filter")){
            var filter=event.target;
            filter.classList.remove("active");
            filter.innerText=filter.dataset.filter;
            var filters=Filters;
            filters[filter.dataset.filter].selected=-1;
            setFilters(filters);
            settest(JSON.stringify(filters));
        }
        
        
    }
    function changeFilter(event){
        // console.log("changeFilter");
        var option=event.target?.dataset.option;
        var filter_btn=event.target?.closest(".filter_btn").querySelector("button");
        var filter=filter_btn.dataset.filter;

        // console.log("option");
        filter_btn.classList.add("active");
        // console.log(filter,":",option);
        var filters=Filters;
        filters[filter].selected=(filters[filter].options.indexOf(option));
        setFilters(filters);
        settest(JSON.stringify(filters));
        filter_btn.innerText=filter+":"+option;
        // console.log(Filters);
    }
    function create_card(item){
        return (
        <div className="card" key={item["id"]}>
          <div className="main">
            <img
              src={item['image']}
              alt="company_profile"
            />
            <div className="details">
              <b>{item['name']}</b>
              <div className="sub_detail">
                <p>{item['date']} ·</p>
                <p>Automatic Payment</p>
              </div>
            </div>
          </div>

          <div className="value">
            <b>{(item['type']==="received")?"+":"-"}${item['payment']}</b>
          </div>
        </div>
        );
    }
  return (
    <div className="activity_box">
      <div className="first">
        <div className="input_box">
          <Search id="search_btn" />

          <input type="text" placeholder="Search by name or email" />
        </div>
        <div id="download_btn">
          <Down />
        </div>
      </div>

      <div className="second">
        <p>Filter by</p>

        <div className="filter_btn_container">

        {Object.keys(Filters).map((filter)=>{
            var filter_details=Filters[filter];
            return (
                <div key={filter} className="filter_btn" onClick={toggle_options}>
                    <button data-filter={filter}>{filter}</button>
                    <div className="options hidden">
                        {
                        filter_details.options.map((option,idx)=>{
                            return(
                                <button key={idx} onClick={changeFilter} data-option={option}>{option}</button>
                                
                            )            
                            })
                        }
                        {/* <hr/> */}
                        
                    </div>
                </div>
            );
        })}
           
          
        </div>
      </div>

      <div className="third">
        <h2>Transaction</h2>
        {
            selectedItems.map((item,idx)=>{
                return create_card(item);
            })
        }
        

      </div>
    </div>
  );
}

export default Activity;
