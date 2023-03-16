import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'


const WEEK_COUNT=3;
const HOUR_COUNT=8;

let gunlukAppointment= [];
let haftalikAppointment = [];
let dSize = 100;
let wSize = 100;
function mo (){
    var arr = [];
    for ( var i = 0; i < 8; i++){
        arr[i] = [];
    }
    for ( var i = 0 ; i < 7; i++){
        for( var j = 0; j < 21; j++)
            arr[i][j] = 0;
    }
    return arr;
}

let colArr = mo ();

class App extends React.Component {

    constructor(){
        super()
        this.state = {
            message: "not hello omer",
            rowNo: 0,
            colNo: 0
        }
    }

    sayHello = (i,j) =>{
       this.setState({
             message:"hello omercim",
             rowNo: i,
             colNo: j
        })
        colArr[i][j] = 1;
    }


    fooFunction(){
        this.setState({
            message:"foo button is clicked"
        })
        colArr[0][0] = 100;
    }

    addDel(){
       //alert("this is alert message in side it")
       if(window.confirm("confirm popup ok or not") == true ){
            this.setState({
                message:"window confirm is ok isnt it"
            })
       }else{
            this.setState({
                message:"cancel is clikk"
            })
       }
    }
///////////////////REAL PART////////////////////////////
    applyFunction(i,j){
        this.setState ({
            message:"apply function is called",
            rowNo:i,
            colNo:j
       })
       if( colArr[i][j] == 0) {
            if(window.confirm("Abonelik al.") == true) {
                colArr[i][j] = 1; //dark blue
            }
            else{
                colArr[i][j] = 2; //light blue
            }
       }else{
            if(window.confirm("Var olani sil")==true) {
                colArr[i][j] = 0;
            }
       }

    }

    moveDaily(arr, i, j){ //to r7emove membership
        this.setState({message:"move daily is called"})
        let value : [number, number] = [i,j]
        for( var k = 0 ; k < arr.length; k++){
            if ( arr[k][0] == i && arr[k][1] == j ){
                break
            }
        }
        arr.splice(k,2)
    }

    moveWeekly(arr, i , j){
        this.setState({message:"move weekly is called"})

        for( var k = 0; k < arr.length; k++) {
            if ( arr[k][0] == i && arr[k][1]){
                arr.splice(k) ;
                k = 0;
            }
        }


    }

    isWhichMarked(saat, gun) {

        let n = gunlukAppointment.length
        dSize = n;
        let m = haftalikAppointment.length
        wSize = m;
        for (let i = 0; i < n; i++) {
            if (gunlukAppointment[i][0] == saat && gunlukAppointment[i][1] == gun) {
                return "gunlukAppointmentMarked";
            }
        }
        for( let i = 0; i < m; i++) {
            if (haftalikAppointment[i][0] == saat && haftalikAppointment[i][1] % 7  == gun % 7){
                return "haftalikAppointmentMarked" ;
            }
        }
        return "notMarked";
    }


    storeMarkedGenel(i,j){
         this.setState ({
                     message:"apply function is called",
                     rowNo:i,
                     colNo:j

                })
        if ( this.isWhichMarked(i,j) == "notMarked"){
            if( window.confirm("Abonelik mi?") == true  ) {
                haftalikAppointment.push( [i,j])
                return "haftalikAppointmentMarked"
            }
            else{
                gunlukAppointment.push([i,j])
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



////////////////////END OF REAL PART/////////////////////

  getTableContent = () => {
    let header = []
    header.push(<th></th>)
    for (let i = 1; i <= WEEK_COUNT * 7; ++i) {
      header.push(<th>{i}</th>)
    }
    let items = []
    for (let i = 0; i < HOUR_COUNT; i++) {
      let row = []
      row.push(<td>{i}: </td>)
      for (let j = 1; j <= WEEK_COUNT * 7; ++j) {
        //   var k = (<td>{i}/{j}</td>)
       //let k = (<td style="red">{i}/{j}</td>)

        //row.push(<td onClick = {()=> this.sayHello(i,j)}>  </td>)
        //row.push(k)
      /*if (colArr[i][j] == 0){
            row.push(<td onClick = {()=> this.storeMarked(i,j)}>  </td>)
        }
        else if (colArr[i][j] == 1){
            row.push(<td style = {{color:"red"}}  onClick = {()=> this.storeMarked(i,j)}>   </td>)
        }
        else if (colArr[i][j] == 2  ){
            row.push(<td style = {{color:"blue"}} onClick = {()=> this.storeMarked(i,j)}>C  </td>)
        }
        else{
        // do nothing
        }
        */

        if(this.isWhichMarked(i,j) == "notMarked" ) {
            row.push( <td onClick = {() => this.storeMarkedGenel(i,j)}> </td>  )

        }else{
            if(this.isWhichMarked(i,j ) == "haftalikAppointmentMarked"){
                row.push(<td style = {{backgroundColor:"darkblue"}}  onClick = {()=> this.storeMarkedGenel(i,j)}>   </td>)
            }
            if(this.isWhichMarked(i,j) == "gunlukAppointmentMarked"){
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
				<div>{this.getTableContent()}</div>
				<div>
			        <button onClick = {() => this.sayHello()}> clickhello </button>
			        <button onClick = {() => this.fooFunction()}> Foooooo</button>
			        <h2> {this.state.message} </h2>
			        <h2> {this.state.rowNo}  {this.state.colNo} </h2>
			        <h1> {this.state.message} </h1>
                    <h1>  00  is {colArr[0][0]}</h1>
                   <button onClick = {() => this.addDel()}> confirmbutton</button>
                   <h3> dsize is {dSize} </h3>
                   <h2> wsize is {wSize} </h2>

				</div>
			</div>
		);
	}
}

export default App


