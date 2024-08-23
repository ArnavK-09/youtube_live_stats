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

#[allow(unused_imports)]
use std::{env, sync::mpsc::channel};

// fn fetch_pokemon(pokemon_name: String) -> Result<i32, i32> {
//     use ureq;
//     let url = "https://pokeapi.co/api/v2/pokemon/".to_owned() + pokemon_name.as_str();
//     let response = ureq::get(&url).call();

//     match response {
//         Ok(resp) => Ok(resp.into_string().unwrap()),
//         Err(e) => match e.kind().to_string().as_str() {
//             "HTTP status error" => Err(404),
//             _ => Err(500),
//         },
//     }
// }

// use serde::Deserialize;
// use serde_json;

// #[derive(Deserialize, Debug)]
// struct Statistics {
//     viewCount: String,
//     subscriberCount: String,
//     hiddenSubscriberCount: bool,
//     videoCount: String,
// }

// #[derive(Deserialize, Debug)]
// struct Channel {
//     id: String,
//     statistics: Statistics,
// }

// #[derive(Deserialize, Debug)]
// struct ChannelListResponse {
//     items: Vec<Channel>,
// }

// fn fetch_subscribers2(channel_id: String) -> Result<(), Box<dyn std::error::Error>> {
//     let url = format!(
//         "https://www.googleapis.com/youtube/v3/channels?part=statistics&id={}&key=AIzaSyDaeV77R4b2ZLByGJW2WRtx_fX4JLyqezM",
//         channel_id
//     );
//     let response = ureq::get(&url).call()?;

//     if response.status() == 200 {
//         let text = response.into_string()?; // Convert response body to string
//         let channel_list: ChannelListResponse = serde_json::from_str(&text)?; // Parse the string as JSON

//         if let Some(channel) = channel_list.items.get(0) {
//             println!("View Count: {}", channel.statistics.viewCount);
//             println!("Subscriber Count: {}", channel.statistics.subscriberCount);
//             println!("Video Count: {}", channel.statistics.videoCount);
//         } else {
//             println!("No channel found with the given ID.");
//         }

//         Ok(())
//     } else {
//         println!("Error: {}", response.status_text());
//         Ok(())
//     }
// }

#[derive(Debug)]
struct ChannelFetchResponse {
    views: i32,
    subscribers: i32,
    videos: i32,
}

#[allow(dead_code)]
fn fetch_subscribers(channel_id: String) -> Result<ChannelFetchResponse, ChannelFetchResponse> {
    use serde;
    use ureq;

    #[derive(serde::Deserialize)]
    #[serde(rename_all = "camelCase")]
    struct Statistics {
        view_count: String,
        subscriber_count: String,
        hidden_subscriber_count: bool,
        video_count: String,
    }

    #[derive(serde::Deserialize)]
    struct Channel {
        id: String,
        statistics: Statistics,
    }

    #[derive(serde::Deserialize)]
    struct ChannelListResponse {
        items: Vec<Channel>,
    }

    let url = format!("https://www.googleapis.com/youtube/v3/channels?part=statistics&id={}&key=AIzaSyDaeV77R4b2ZLByGJW2WRtx_fX4JLyqezM", channel_id.as_str());

    let req = ureq::get(&url);

    match req.call() {
        Ok(res) => match res.into_json::<ChannelListResponse>() {
            Ok(data) => {
                let channel_stats = &data.items.first().unwrap().statistics;
                let channel_stats_views = channel_stats.view_count.parse::<i32>().unwrap();
                let channel_stats_subs = channel_stats.subscriber_count.parse::<i32>().unwrap();
                let channel_stats_videos = channel_stats.video_count.parse::<i32>().unwrap();

                Ok(ChannelFetchResponse {
                    views: channel_stats_views,
                    subscribers: channel_stats_subs,
                    videos: channel_stats_videos,
                })
            }
            Err(_) => Ok(ChannelFetchResponse {
                views: 0,
                subscribers: 0,
                videos: 0,
            }),
        },
        Err(_) => Ok(ChannelFetchResponse {
            views: -1,
            subscribers: -1,
            videos: -1,
        }),
    }
}

#[allow(unused_variables)]
fn main() {
    let v = env::var("USER");

    let x = fetch_subscribers(String::from("UCvXscyQ0cLzPZeNOeXI45Sw"));
    dbg!(x);
}
