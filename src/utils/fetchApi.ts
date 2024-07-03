export const BaseUrl = "http://localhost:3000";

export const fetchApi = <Req, Res>({ 
   path, method="POST", body, auth=""
}: {
   path: string, method?:string, body?: Req, auth?: string
}): Promise<{ resp:Res|any, resp_status:string, status?: string }> => {
   return new Promise(resolve => {
      fetch(`${BaseUrl}/${path}`, {
         method,
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Authorization": auth
         },
         body: JSON.stringify(body)
      })
         .then(res => res.json())
         .then((data: Res) => {
            resolve({ resp: data, resp_status: "OK"})
         })
         .catch(err => {
            resolve({ resp: {}, resp_status: 'NOK' })
         })
   })
};
