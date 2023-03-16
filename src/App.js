import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'


const WEEK_COUNT=3;   // these two variables are used while creating the table( 2d array)
const HOUR_COUNT=8;

let gunlukAppointment= []; // arrays for storing the marked cells
let haftalikAppointment = [];


class App extends React.Component {

    constructor(){
        super()
        this.state = {
            message: "",
            //rowNo: 0,
            //colNo: 0,
            beginDay:0

        }
    }


    moveDaily(arr, i, j){ // this function detects the index of the cell which wanted to be removed and removes it from the appointment array
        this.setState({message:"move daily is called"})
        let value : [number, number] = [i,j]
        for( var k = 0 ; k < arr.length; k++){
            if ( arr[k][0] == i && arr[k][1] == j + this.state.beginDay ){
                break           // index is needed for splice method
            }
        }
        arr.splice(k,2)
    }

    moveWeekly(arr, i , j){ // this function detects the index of the cell which wanted to be removed and removes it from the appointment array
        this.setState({message:"move weekly is called"})

        for( var k = 0; k < arr.length; k++) {
            if ( arr[k][0] == i && arr[k][1]){
                arr.splice(k) ;
                k = 0;
            }
        }
    }

    isWhichMarked(saat, gun) { // checks the situation of the clicked cells , whether they are marked or not
        let n = gunlukAppointment.length
        let m = haftalikAppointment.length
        for (let i = 0; i < n; i++) {
            if (gunlukAppointment[i][0] == saat && gunlukAppointment[i][1] == gun +  this.state.beginDay) {
                return "gunlukAppointmentMarked"; // this means that the clicked cell is a marked cell
            }
        }
        for( let i = 0; i < m; i++) {
            if (haftalikAppointment[i][0] == saat && haftalikAppointment[i][1] % 7   == (gun +  this.state.beginDay)  % 7  ){
                return "haftalikAppointmentMarked" ; // this means that the clicked cell is marked
            }
        }
        return "notMarked"; // no condition fits for the marked cell, so the clicked cell is not marked. it is ready to be dark blue or light blue
    }


    storeMarkedGenel(i,j){ // stores the marked cells in the considered arrays or removes them after asking the alert questions
         this.setState ({
                     message:"apply function is called",
                     //rowNo:i,
                     //colNo:j

                })
        if ( this.isWhichMarked(i,j ) == "notMarked"){
            if( window.confirm("Abonelik mi?") == true  ) {
                haftalikAppointment.push( [i,j])
                return "haftalikAppointmentMarked"
            }
            else{
                gunlukAppointment.push([i,j  + this.state.beginDay])
                return "gunlukAppointmentMarked";
            }
        }else{
            if( window.confirm("Silinsin mi? ") == true) {
                //silme islemi
                this.moveDaily(gunlukAppointment, i,j);
                this.moveWeekly(haftalikAppointment,i,j);
                return "notMarked";
            }
            else{
                //do nothing
            }
        }
   }

    //these functions slides the window/frame of the calendar
    slideNextDay(){
        this.setState({
            beginDay: this.state.beginDay + 1
        })
    }

    slideNextWeek() {
        this.setState({
            beginDay: this.state.beginDay + 7
        })
    }

    slidePrevDay(){
        this.setState({
            beginDay : this.state.beginDay - 1
        })
    }

    slidePrevWeek(){
        this.setState({
            beginDay: this.state.beginDay - 7
        })
    }

    resetApp(){
        this.setState({
            beginDay: 0,
        })
        haftalikAppointment = [] //empty the array
        gunlukAppointment = [] //empty the array
    }

    makeHeaderDate(count) {
        var date = new Date();
        date.setDate(date.getDate() + count)
        var result =  date.getDate() + "." + (date.getMonth() + 1) + "." + (date.getYear() + 1900);
        return result;
    }



  getTableContent = () => {
    let header = []
    header.push(<th></th>)

    for (var i = 1 + this.state.beginDay  ; i <= WEEK_COUNT * 7 + this.state.beginDay; ++i) { // this create the header part of the frame.
        var headDate = this.makeHeaderDate(i - 1)
        header.push(<th>{headDate}</th>)
    }
    let items = []
    for (let i = 8; i < HOUR_COUNT + 9; i++) { //create hour part in the frame (the first column of the frame )
      let row = []
      row.push(<td>{i}:00 </td>)
      for (let j = 1; j <= WEEK_COUNT * 7; ++j) {

        if(this.isWhichMarked(i,j ) == "notMarked" ) {
            row.push( <td onClick = {() => this.storeMarkedGenel(i,j )}> </td>  )

        }else{
            if(this.isWhichMarked(i,  j) == "haftalikAppointmentMarked"){
                row.push(<td style = {{backgroundColor:"darkblue"}}  onClick = {()=> this.storeMarkedGenel(i,j)}>   </td>)
            }
            if(this.isWhichMarked(i,j ) == "gunlukAppointmentMarked"){
                row.push( <td style = {{backgroundColor:"lightblue"}} onClick = {()=> this.storeMarkedGenel(i,j)}> </td> )
            }
        }


      }
      items.push(<tr>{row}</tr>)
    }


    return (
            <table>
            <thead>{header}</thead>
            <tbody>{items}</tbody>
            </table>
        );
	};
	render() {
		return (
		    <div>
		        <button onClick = {() => this.slidePrevWeek()}  >  &#60;&#60; </button>
                <button onClick = {() => this.slidePrevDay()}  >  &#60; </button>
                <button onClick = {() => this.resetApp()}  >  |  </button>
		        <button onClick = {() => this.slideNextDay()}  > >  </button>
		        <button onClick = {() => this.slideNextWeek()}  > >> </button>
				<div>{this.getTableContent()}</div>
			</div>
		);
	}
}

export default App


