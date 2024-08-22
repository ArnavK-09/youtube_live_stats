// use reqwest::blocking::get;
// use serde_json::json;
// use serde_json::Value;

// fn fetch_pokemon(pokemon_name: String) -> Result<Value, Value> {
//     let url = "https://pokeapi.co/api/v2/pokemon/".to_owned() + pokemon_name.as_str();
//     let response = reqwest::blocking::get(url);
//     match response {
//         Ok(resp) => {
//             if resp.status().is_success() {
//                 let json: Value = resp.json().unwrap();
//                 Ok(json)
//             } else if resp.status().as_u16() == 404 {
//                 let error_json = json!({
//                     "error": "Pokémon not found",
//                     "status": 404
//                 });
//                 Err(error_json)
//             } else {
//                 Err(json!({
//                     "error": "Unexpected error",
//                     "status": resp.status().as_u16()
//                 }))
//             }
//         }
//         Err(_) => {
//             Err(json!({
//                 "error": "Failed to connect to the server"
//             }))
//         }
//     }
// }


fn fetch_pokemon(pokemon_name: String) -> Result<String, i32> {
    use ureq;
    let url = "https://pokeapi.co/api/v2/pokemon/".to_owned() + pokemon_name.as_str();
    let response = ureq::get(&url).call();

    match response {
        Ok(resp) => {
            Ok(resp.into_string().unwrap())
        }
        Err(e) => {
            match e.kind().to_string().as_str() {
                "HTTP status error" => Err(404),
                _ => Err(500)
            }
        }
    }
}



fn main() {
    match fetch_pokemon(String::from("ditdto")) {
        Ok(json) => println!("{}", json),
        Err(err_json) => println!("{}", err_json),
    }
}
