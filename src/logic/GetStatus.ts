
const GetStatus = async () => {
    fetch(
      `https://app.toncells.org:9966/API/getStatus`
      , {
        method: "get",
      }
    )
      .then((e: any) => e.json())
      .then((e: any) => {
        
        console.log(e);

      })

};

export default GetStatus