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

    function filterItems(){
        
        var cat="";
        var final_items=Object.keys(Filters).map((filter)=>{
            var temp_items=[];
            // {console.log(filter);}
            if(Filters[filter].selected!==-1){
                // {console.log(filter);}
                if(filter==="Type"){
                    var cat=Filters[filter].options[Filters[filter].selected];  // cat => category
                    if (cat==="Sent"){
                        temp_items=items.filter((item)=>{
                        return (item.type==="sent");
                        })
                    }
                    else if(cat==="Received"){
                        temp_items=items.filter((item)=>{
                        return (item.type==="received");
                        })
                    }
                    // console.log(temp);
                }
                else if(filter==="Status"){
                    var cat=Filters[filter].options[Filters[filter].selected];  // cat => category
                    if (cat==="pending"){
                        temp_items=items.filter((item)=>{
                            return (item.status==="pending");
                        })
                    }
                    else if(cat==="completed"){
                        temp_items=items.filter((item)=>{
                            return (item.status==="completed");
                        })
                    }
                    else if(cat==="failed"){
                        temp_items=items.filter((item)=>{
                            return (item.status==="failed");
                        })
                    }
                }
                else if(filter==="Date"){
                    var curr_date=new Date();
                    curr_date.setHours(0);
                    curr_date.setMinutes(0);
                    curr_date.setSeconds(0);
                    curr_date=curr_date.getTime();

                    var cat=Filters[filter].options[Filters[filter].selected];  // cat => category
                    if (cat==="Last 30 days"){
                        temp_items=items.filter((item)=>{
                            var item_date=new Date(item.date).getTime();
                            
                            return ((curr_date-item_date)<=(1000*60*60*24*30));
                        })
                    }
                    else if(cat==="Last 90 days"){
                        temp_items=items.filter((item)=>{
                            var item_date=new Date(item.date).getTime();
                            return ((curr_date-item_date)<=(1000*60*60*24*90));
                        })
                    }
                    
                }
                // setSelectedItems()
                return temp_items;
            }
            else{
                return items;
            }
        })
        
        var final_final_items = final_items[0].filter(value => final_items[1].includes(value));
        final_final_items = final_final_items.filter(value => final_items[2].includes(value));

        // for final_items
        console.log(final_final_items);
        setSelectedItems(final_final_items);
    }
    function toggle_options(event){
        event.target?.closest(".filter_btn").querySelector(".options").classList.toggle("hidden");
        
    }
    function changeFilter(event){
        // console.log("changeFilter");
        var option=event.target?.innerHTML;
        var filter_btn=event.target?.closest(".filter_btn").querySelector("button");
        var filter=filter_btn.innerHTML;
        // console.log(filter,":",option);
        var filters=Filters;
        filters[filter].selected=(filters[filter].options.indexOf(option));
        setFilters(filters);
        settest(JSON.stringify(filters));
        // filter_btn.innerText=filter_btn.innerText+":"+option;
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
            <b>${item['payment']}</b>
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
                    <button className="active">{filter}</button>
                    <div className="options hidden">
                        {
                        filter_details.options.map((option,idx)=>{
                            return(
                                <button key={idx} onClick={changeFilter} className="active">{option}</button>
                                
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
