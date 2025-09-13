import React, {useState, useEffect} from 'react';
import "../../assets/style/dashboard.css"
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler, } from 'chart.js';

  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );




const DashboardPage = () => {
  const [dataRumahSehat, setDataRumah] = useState([]);
  const [dataUser, setDataUser] = useState(0)
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [chartData2, setChartData2] = useState({
    labels: [],
    datasets: [],
  });

  //tampil data pada histogram
  useEffect(() =>{
    const hisData = async () => {
      try{
        const res = await axios.get('https://84a67d6d7383.ngrok-free.app/data/ambildata',{
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Content-type": "application/json",
             Accept: "application/json"
          }
        })
        const data = res.data.data
        console.log("data histogram: ", res.data.data)

        const groupData = data.reduce((acc, item) => {
          const {rt, status} = item
          if(!acc[rt]){
            acc[rt] = {sehat:0, tidakSehat:0}
          }
          if(status =='Rumah Sehat'){
            acc[rt].sehat += 1
          }else{
            acc[rt].tidakSehat +=1
          }
          return acc
        }, {})


        const groupRw= data.reduce((acc, item) => {
          const {rw, status} = item
          if(!acc[rw]){
            acc[rw] = {sehat:0, tidakSehat:0}
          }
          if(status =='Rumah Sehat'){
            acc[rw].sehat += 1
          }else{
            acc[rw].tidakSehat +=1
          }
          return acc
        }, {})

        //Data RT
        const rtLabels = Object.keys(groupData)
        const sehatData = rtLabels.map(rt => groupData[rt].sehat)
        const tidakSehatData = rtLabels.map(rt => groupData[rt].tidakSehat)
        //Data RT

        //Data RW
        const rwLabels = Object.keys(groupRw)
        const sehatRw = rwLabels.map(rw => groupRw[rw].sehat)
        const unSehatRw = rwLabels.map(rw => groupRw[rw].tidakSehat)
        //Data RW


        //HISTOGRAM RT
        setChartData({
          labels: rtLabels,
          datasets:[
            {
              label: 'Rumah Sehat',
              data:sehatData,
              backgroundColor:'#B09FFF',
              borderWidth:1,
              borderRadius: 10,
              maxBarThickness: 100
            },
            {
              label: 'Rumah Tidak Sehat',
              data: tidakSehatData,
              backgroundColor: "#FF6384",
              borderWidth: 1,
              borderRadius: 10,
              maxBarThickness: 100,
            }
          ]
        })
        //HISTOGRAM RT

        //HISTOGRAM RW
        setChartData2({
          labels: rwLabels,
          datasets:[
            {
              label: 'Rumah Sehat',
              data:sehatData,
              backgroundColor:'#B09FFF',
              borderWidth:1,
              borderRadius: 10,
              maxBarThickness: 100
            },
            {
              label: 'Rumah Tidak Sehat',
              data: tidakSehatData,
              backgroundColor: "#FF6384",
              borderWidth: 1,
              borderRadius: 10,
              maxBarThickness: 100,
            }
          ]
        })        
        //HISTOGRAM RW

      }catch(error){
        console.error('Error fetching data:',error)
      }
    }
    hisData()
  },[])

  //OPTIONS RT
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'RT (Rukun Tetangga)', // Label sumbu x
          color: '#333',
          font: {
            size: 14
          }
        }
      },
      y: {
        beginAtZero: true,
        min: 0, // Minimum nilai sumbu y
        max: 1600, // Maksimum nilai sumbu y
        ticks: {
          stepSize: 100, // Kelipatan nilai pada sumbu y
          callback: function(value) {
            if (value % 100 === 0) {
              return value; // Menampilkan bilangan kelipatan 100
            }
          }
        },
        title: {
          display: true,
          text: 'Jumlah Rumah', // Label sumbu y
          color: '#333',
          font: {
            size: 14
          }
        }
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  //OPTIONS RT

  //OPTIONS RW
  const optionsRw = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'RW (Rukun Warga)', // Label sumbu x
          color: '#333',
          font: {
            size: 14
          }
        }
      },
      y: {
        beginAtZero: true,
        min: 0, // Minimum nilai sumbu y
        max: 1600, // Maksimum nilai sumbu y
        ticks: {
          stepSize: 100, // Kelipatan nilai pada sumbu y
          callback: function(value) {
            if (value % 100 === 0) {
              return value; // Menampilkan bilangan kelipatan 100
            }
          }
        },
        title: {
          display: true,
          text: 'Jumlah Rumah', // Label sumbu y
          color: '#333',
          font: {
            size: 14
          }
        }
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  //OPTIONS RW
  //Tampil data pada capsule atas
  useEffect(() => {
    axios.get('https://84a67d6d7383.ngrok-free.app/data/ambildata',{
      headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-type": "application/json",
         Accept: "application/json"
      }
    })
      .then(response => {
        setDataRumah(response.data.data)
        rumahSehat = dataRumahSehat.find(rumah => rumah.status === 'Rumah Sehat')
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  //tampil data pada capsule atas

  useEffect(() => {
    axios.get('https://84a67d6d7383.ngrok-free.app/data/auth', {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-type": "application/json",
         Accept: "application/json"
      }
    }).then(response => {
      setDataUser(response.data.user)
    }).catch(error => {
      console.error(error);
  })
}, [])

const rumahSehat = dataRumahSehat.filter(user => user.status === 'Rumah Sehat');
const banyakRumahSehat = rumahSehat.length;

const rumahTidakSehat = dataRumahSehat.filter(user => user.status === 'Rumah Tidak Sehat');
const banyakRumahTidakSehat = rumahTidakSehat.length
console.log(banyakRumahSehat)

  return (
    <div>
      <div className='card-container'>
        <div className='card' style={{background:"#FF7F50", color:" #FCEFEF"}}>
            <img src={require('../../assets/images/input.png')} className='icond'/>
          <span className='content-card'>
            <p>{dataUser.length}</p>
            <h4>Banyak Data yang masuk</h4>
          </span>
        </div>

        <div className='card'style={{background:" #4ba3c3",color:" #FCEFEF"}}>
            <img src={require('../../assets/images/person.png')} className='iconp'/>
          <span className='content-card'>
            <p>{dataUser.length}</p>
            <h4>Banyak Pengguna</h4>
          </span>
        </div>

        <div className='card' style={{background:"#9966CC", color:" #FCEFEF"}}>
            <img src={require('../../assets/images/database.png')} className='icond'/>
          <span className='content-card'>
            <p>{dataRumahSehat.length}</p>
            <h4>Banyak Data yang tersimpan</h4>
          </span>
        </div>

        <div className='card'style={{background:"#a4161a",color:" #FCEFEF"}}>
            <img src={require('../../assets/images/person.png')} className='iconp'/>
          <span className='content-card' >
            <p>{banyakRumahSehat}</p>
            <h4>Rumah Sehat</h4>
          </span>
        </div>

        <div className='card'style={{background:"#1b998b",color:" #FCEFEF"}}>
            <img src={require('../../assets/images/person.png')} className='iconp'/>
          <span className='content-card'>
            <p>{banyakRumahTidakSehat}</p>
            <h4>Rumah Tidak Sehat</h4>
          </span>
        </div>
      </div>

    <div className='chart-container'>
      {chartData.labels.length > 0 ? (
        <>
          <div className='bar-chart'>
            <h2 style={{textAlign:"center"}}>Jumlah Rumah Sehat Lingkup RT</h2>
            <Bar data={chartData} options={options} />
          </div>
          <div className='bar-chart'>
            <h2 style={{textAlign:"center"}}>Jumlah Rumah Sehat Lingkup RW</h2>
            <Bar data={chartData2} options={optionsRw} />
          </div>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
    </div>
  );
}

export default DashboardPage;
