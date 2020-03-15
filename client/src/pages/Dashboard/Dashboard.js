import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext'
import { Row, Col } from 'reactstrap';
import numeral from 'numeral';
import axios from 'axios';
import SearchBar from '../../components/Search/SearchBar';
import MyNavbar from '../../components/Navbar/Navbar';
import { Card, CardDeck, Button, Container, Table, Image, Figure, ListGroupItem, CardGroup } from 'react-bootstrap';
import MyCard from '../../components/Card';
import TopCard from '../../components/Cardimage';
import ApiTable from '../../components/APiTable';
import Logo from '../../music_hall.jpg'



import API from '../../utils/API';
let apiData = '';
let newVal = "";

function Dashboard(props) {
  const [state, setState] = useState({
    search: "",
    value: "",
  });
  const [data, setData] = useState(null);
  const [tableData, setTabledata] = useState()
  const { isAuth, logout } = useContext(AuthContext);
  console.log("dashboard user: ", isAuth)


  function handleInputChange(event) {
    const { name, value } = event.target;
    console.log("this value", value)
    console.log("state", state);
    setState(
      {
        ...state,
        [name]: value
      }
    )
  }

  function handleSubmit(event) {
    event.preventDefault();
    // console.log("submitted");
    let url = `http://localhost:3001/api/dashboard/${state.search}`
    axios.get(url)
      .then(response => {

        console.log("our response", response);

        //   const newData = data.data
        // console.log("this is rout",newData.push(data.data));
        // console.log(state.search)
        newVal = response.data

        console.log("our newVal", newVal);


        let MyBio = response.data.Bio;
        console.log("my Bio", MyBio);

        console.log(response.data.results)


        // manipulating bandsintown api data
        const bandsintown = response.data.results.bandsintown.obj.followers[19];
        bandsintown['artist'] = state.search;
        bandsintown['bandsintown_followers'] = bandsintown['value']
        bandsintown['bandsintown_timestp'] = bandsintown['timestp']
        bandsintown.bandsintown_timestp = Date.parse(bandsintown.bandsintown_timestp)
        delete bandsintown.value
        delete bandsintown.channel_id
        delete bandsintown.interpolation
        delete bandsintown.daily_diff
        delete bandsintown.timestp

        // manipulating spotify api data
        const spotifyPopularity = response.data.results.spotify.obj.popularity.reverse()[0]
        spotifyPopularity['spotify_timestp'] = spotifyPopularity['timestp']
        spotifyPopularity['spotify_popularity'] = spotifyPopularity['value']
        spotifyPopularity.spotify_timestp = Date.parse(spotifyPopularity.spotify_timestp)
        delete spotifyPopularity.timestp
        delete spotifyPopularity.value   
        
        // manipulating deezer fans api data
        const deezerFans = response.data.results.deezer.obj.fans.reverse()[0]
        deezerFans['deezer_timestp'] = deezerFans['timestp']
        deezerFans['deezer_popularity'] = deezerFans['value']
        deezerFans.deezer_timestp = Date.parse(deezerFans.deezer_timestp)
        delete deezerFans.timestp
        delete deezerFans.value
        delete deezerFans.daily_diff
        delete deezerFans.interpolation

        // manipulating instagram api data
        const instagramFollowers = response.data.results.instagram.obj.followers.reverse()[0]
        instagramFollowers['instagram_timestp'] = instagramFollowers['timestp']
        instagramFollowers['instagram_followers'] = instagramFollowers['value']
        instagramFollowers.instagram_timestp = Date.parse(instagramFollowers.instagram_timestp)
        delete instagramFollowers['timestp']
        delete instagramFollowers['value']
        delete instagramFollowers['flags']
        delete instagramFollowers['daily_diff']
        delete instagramFollowers['interpolation']

        // manipulating youtube subscribers api data
        const youtubeSubscribers = response.data.results.youtube.obj.subscribers.reverse()[0]
        youtubeSubscribers['youtube_subscribers_timestp'] = youtubeSubscribers['timestp']
        youtubeSubscribers['youtube_subscribers'] = youtubeSubscribers['value']
        youtubeSubscribers.youtube_subscribers_timestp = Date.parse(youtubeSubscribers.youtube_subscribers_timestp)
        delete youtubeSubscribers['timestp']
        delete youtubeSubscribers['value']
        delete youtubeSubscribers['daily_diff']
        delete youtubeSubscribers['interpolation']

        // manipulating youtube views api data
        const youtubeViews = response.data.results.youtube.obj.views.reverse()[0]
        youtubeViews['youtube_views_timestp'] = youtubeViews['timestp']
        youtubeViews['youtube_views'] = youtubeViews['value']
        youtubeViews.youtube_views_timestp = Date.parse(youtubeViews.youtube_views_timestp)
        delete youtubeViews['timestp']
        delete youtubeViews['value']
        delete youtubeViews['daily_diff']
        delete youtubeViews['interpolation']

        //combining api data into object
        apiData = { ...bandsintown, ...spotifyPopularity, ...deezerFans, ...instagramFollowers, ...youtubeSubscribers, ...youtubeViews };
        console.log(apiData);

        setData(
          newVal
        )
      })

  };
  useEffect((e) => { console.log("this is our new data", data) }, [data])

  function tableDisplay(event) {
    console.log("table data:", data);

  }



  // Pass apiData to API util
  function handlePostArtist(event) {


    console.log("this is apiData", apiData)
    API.postMusicAPI(apiData)

    setTabledata(
      newVal
    )


  }
  

  useEffect((e) => { console.log("this is our new tabledata", tableData) }, [tableData])


  return (
    <>
      <MyNavbar>
        <SearchBar
          name="search"
          value={state.value}
          search={state.search}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit} />
      </MyNavbar>

      {!data ? <>
        <container fluid> <img
          src="https://www.nhpr.org/sites/nhpr/files/styles/x_large/public/201909/Telluride.jpg"
          width="100%"
          
         

          alt=" Welcome to the Music Hall Dashboard! "></img>

        </container>

      </>




        :
        <Container fluid style={{ background: "linear-gradient(135deg, #8363a1 0%, #74a8c3 100%)", backgroundImage:`url${Logo} width:"100%, height:100%` }}>

          <Container fluid style={{ opacity:"1", marginBlock: "2rem", marginTop:"2rem" }} >

          <Row>
              <Col>

                {data && 'bio' in data &&
                  <TopCard
                    image={data.bio.obj.image_url}
                    rank={data.bio.obj.cm_artist_rank}
                    genre={data.bio.obj.tags[0].name}
                    artist_name={data.bio.obj.name}
                    handlePostArtist={handlePostArtist}
                    
                  >

                  </TopCard>
                }
               </Col>


              
              
              
              
              
              
              
              {Object.keys(data.results).map((Api_name) => {
                let time = ""
                let text = numeral("").format('0,0');
                let image = ""
                
                switch (Api_name) {
                  case "bandsintown":
                    image = "https://darkskychoir.com/wp-content/uploads/2019/04/bandsintown.png"
                    time = data.results[Api_name].obj.followers[19].timestp
                    text = <><h4 >Followers:</h4><br/><ListGroupItem style={{borderRadius:"30rem", backgroundColor:"#9063cd",color:"white"}}> {data.results[Api_name].obj.followers[18].value}</ListGroupItem></>
                    
                    break;
                  case "instagram":
                    image = "https://pluspng.com/img-png/instagram-png-instagram-png-icon-1024.png"
                    time = data.results[Api_name].obj.followers[20].timestp
                    text = <><h4 >Followers:</h4><br/><ListGroupItem style={{borderRadius:"30rem", backgroundColor:"#9063cd",color:"white"}}> {data.results[Api_name].obj.followers[20].value}</ListGroupItem></>
                    
                    break;

                  case "spotify":
                    image = "https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
                    time = data.results[Api_name].obj.followers[0].timestp
                    text = <><h4 >Followers:</h4><br/><ListGroupItem style={{borderRadius:"30rem", backgroundColor:"#9063cd",color:"white"}}> {data.results[Api_name].obj.followers[0].value}</ListGroupItem></>
                    
                    break;
                  case "youtube":
                    image = "https://lh6.googleusercontent.com/proxy/opjltYFTlI3C9bRRpxCBbRPh37Rd_DumhkwtE__adClUzJje1zDU8rpx5BVd1LFQasztUHMEA_s8CCNp2hmtWLNB"

                text=<><h4 >Subs:</h4><br/><ListGroupItem style={{borderRadius:"30rem", backgroundColor:"#9063cd",color:"white"}}> {data.results[Api_name].obj.subscribers[20].value}</ListGroupItem></> 
                    time = data.results[Api_name].obj.subscribers[20].timestp
                    break;
                  case "deezer":
                    image = "https://i.pinimg.com/originals/11/23/82/112382d6b0e0e47461fb55f03e597e9d.png"
                    time = data.results[Api_name].obj.fans[19].timestp
                    
                  text=<><h4 >Fans:</h4><br/><ListGroupItem style={{borderRadius:"30rem", backgroundColor:"#9063cd",color:"white"}}>{data.results[Api_name].obj.fans[19].value}</ListGroupItem></> 
                  numeral(text).format('0,0')  
                  break;
                  
                }
                return (
                  
                    
                  
                  

                  <CardGroup >


                    <MyCard title={Api_name} timestp={time} image={image}>
                      {text}
                    </MyCard>


                  </CardGroup>

                  
                )
              })}



            </Row>
 </Container>

          
          
          
          
          {!tableData ?

            <Container fluid>
              <Row>

                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      
                      <th>BandsinTown</th>
                      <th>Instagram</th>
                      <th>Spotify</th>
                      <th>Youtube</th>
                      <th>Deezer</th>
                    </tr>
                  </thead>

                </Table>
              </Row>
            </Container>

















            :

            <Container fluid>
              <Row>

                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      
                      <th>BandsinTown</th>
                      <th>Instagram</th>
                      <th>Spotify</th>
                      <th>Youtube</th>
                      <th>Deezer</th>
                    </tr>
                  </thead>
                  <tbody>


                    <tr>
          

                      {Object.keys(tableData.results).map((Api_name) => {
                        
                        let text = ""
                        
                        switch (Api_name) {
                          case "bandsintown":
                            
                            text = <>{tableData.results[Api_name].obj.followers[18].value}</>
                            break;
                          case "instagram":
                           
                            text = <>{tableData.results[Api_name].obj.followers[20].value}</>
                            break;

                          case "spotify":
                            
                        text = <>{tableData.results[Api_name].obj.followers[0].value}</>
                            break;
                          case "youtube":
                            

                            text = <>{tableData.results[Api_name].obj.subscribers[20].value}</>
                            break;
                          case "deezer":
                            
                            text = <>{tableData.results[Api_name].obj.fans[19].value}</>
                            break;
                          
                        }
                        return (
                          <>
                            <td>{text}</td>
                            {/* <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td> */}
                          </>
                        )
                      })}

                    </tr>

                  </tbody>
                </Table>

              </Row>




            </Container>

          }


        </Container>
      }
    </>
  );
}
export default Dashboard;




