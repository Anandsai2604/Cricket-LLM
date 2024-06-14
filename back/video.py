import sys
import json  

url_dict = {
    "virat": "https://youtu.be/Ft4SYtajZO8?si=rz9f1d1d4MPp0gfs",
    "rohit": "https://youtu.be/JnzgeLfEVbE?si=eDsxlEBwHy5m7Cgm",
    "sachin":"https://www.youtube.com/watch?v=lRG8xDa2jGM&pp=ygUKc2FjaGluIHVybA%3D%3D",
    "yuvraj": "https://www.youtube.com/watch?v=8b0ubLO2MUE&pp=ygUNeXV2YXJhaiBzaW5naA%3D%3D",
    "gambir" :"https://www.youtube.com/watch?v=BD608IJ3aCE&pp=ygUVZ2F1dGFtIGdhbWJoaXIgcHJpbWUg",
    "ashvin": "https://www.youtube.com/watch?v=C2IqXfDm2cU",
    "bumra": "https://www.youtube.com/watch?v=EO4ziJ5R0BI&pp=ygUPYnVtcmEgdmlkZW8gaWNj",
    "hardik":"https://www.youtube.com/watch?v=kYhZ9T8UuoU&pp=ygUXaGFyZGlrIHBhbmR5YSB2aWRlbyBpY2M%3D",
    "rishab pant":"https://www.youtube.com/watch?v=6KpfdD-pbEw&pp=ygURcmlzaGFiIHBhbnQgdmlkZW8%3D",
    "jadeja": "https://www.youtube.com/watch?v=W4PkYijBHAo&pp=ygUQamFkZWphIHZpZGVvIGljYw%3D%3D",
    "shreyas iyer": "https://www.youtube.com/watch?v=0ABHNu0mE48&pp=ygUWc2hyZXlhcyBpeWVyIHZpZGVvIGljYw%3D%3D",
    "shivam dube": "https://www.youtube.com/watch?v=IhOFckU_9OI&pp=ygUWc2hpdmFtIGR1YmVyIHZpZGVvIGljYw%3D%3D",
    "chahal":"https://www.youtube.com/watch?v=Fn-1Wr4H1us&pp=ygUQY2hhaGFsIHZpZGVvIGljYw%3D%3D",
    "kuldeep":"https://www.youtube.com/watch?v=fIMtuORP54Q&pp=ygURa3VsZGVlcCB2aWRlbyBpY2M%3Dx"
    
}

def open_video(player_name):
    if player_name in url_dict:
        url = url_dict[player_name]
        print(json.dumps({"url": url}))  # Output JSON data
    else:
        print(json.dumps({"error": "URL not found for the input name."}))
data_to_send = ' '.join(sys.argv[1:])
p  = {"name": "data_to_send"}
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script.py [player_name]")
        sys.exit(1)
    player_name = sys.argv[1].lower()
    open_video(player_name)

