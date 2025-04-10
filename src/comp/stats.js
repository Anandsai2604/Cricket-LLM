import React, { useState } from "react";

export default function Stats() {
    const [playerName, setPlayerName] = useState('');
    const [fetching, setFetching] = useState(false);
    const [stats, setStats] = useState(null);
    const players = [
        "AM Ghazanfar",
        "Aaliyah Alleyne",
        "Aamer Jamal",
        "Aaron Hardie",
        "Abbas Afridi",
        "Abdul Rahman",
        "Abdullah Shafique",
        "Abrar Ahmed",
        "Achini Kulasuriya",
        "Adam Milne",
        "Adithya Ashok",
        "Afif Hossain",
        "Afsar Zazai",
        "Afy Fletcher",
        "Agha Salman",
        "Aiden Markram",
        "Aimee Maguire",
        "Akash Deep",
        "Akeal Hosein",
        "Akila Dananjaya",
        "Alana Dalzell",
        "Alana King",
        "Alex Carey",
        "Alice Capsey",
        "Alice Davidson-Richards",
        "Alick Athanaze",
        "Aliya Riaz",
        "Alyssa Healy",
        "Alzarri Joseph",
        "Ama Kanchana",
        "Amanjot Kaur",
        "Amelia Kerr",
        "Amy Hunter",
        "Amy Jones",
        "Anamul Haque",
        "Andre Fletcher",
        "Andy Balbirnie",
        "Andy McBrine",
        "Angelo Mathews",
        "Anneke Bosch",
        "Annerie Dercksen",
        "Arafat Minhas",
        "Arlene Kelly",
        "Arshad Iqbal",
        "Arshdeep Singh",
        "Ashen Bandara",
        "Ashleigh Gardner",
        "Ashton Agar",
        "Asif Ali",
        "Asitha Fernando",
        "Audrey Mazvishaya",
        "Ava Canning",
        "Avesh Khan",
        "Avishka Fernando",
        "Axar Patel",
        "Ayabonga Khaka",
        "Ayanda Hlubi",
        "Ayesha Zafar",
        "Azam Khan",
        "Azmatullah Omarzai",
        "Babar Azam",
        "Bareddy Anusha",
        "Barry McCarthy",
        "Bella Armstrong",
        "Beloved Biza",
        "Ben Duckett",
        "Ben Dwarshuis",
        "Ben Foakes",
        "Ben Lister",
        "Ben McDermott",
        "Ben White",
        "Bernadine Bezuidenhout",
        "Bess Heath",
        "Beth Mooney",
        "Beuran Hendricks",
        "Binura Fernando",
        "Bismah Maroof",
        "Bjorn Fortuin",
        "Blessing Muzarabani",
        "Brad Evans",
        "Brandon King",
        "Brandon Mavuta",
        "Brian Bennett",
        "Brooke Halliday",
        "Brydon Carse",
        "Cameron Green",
        "Cara Murray",
        "Carl Mumba",
        "Chad Bowes",
        "Chamari Athapaththu",
        "Chamika Gunasekara",
        "Chamika Karunaratne",
        "Charith Asalanka",
        "Charlie Dean",
        "Cherry-Ann Fraser",
        "Chiedza Dhururu",
        "Chinelle Henry",
        "Chipo Mugeri-Tiripano",
        "Chris Green",
        "Chris Jordan",
        "Christine Mutasa",
        "Clive Madande",
        "Clyde Fortuin",
        "Cole McConchie",
        "Craig Ervine",
        "Craig Young",
        "Curtis Campher",
        "Dane Cleaver",
        "Danielle Gibson",
        "Darcie Brown",
        "Darwish Rasooli",
        "Daryl Mitchell",
        "David Bedingham",
        "David Miller",
        "Dawid Malan",
        "Dayalan Hemalatha",
        "Dean Elgar",
        "Dean Foxcroft",
        "Deepak Chahar",
        "Devdutt Padikkal",
        "Devon Conway",
        "Dewald Brevis",
        "Dhananjaya de Silva",
        "Dhruv Jurel",
        "Diana Baig",
        "Dilara Akter",
        "Dilshan Madushanka",
        "Dimuth Karunaratne",
        "Dinesh Chandimal",
        "Djenaba Joseph",
        "Dominic Drakes",
        "Donovan Ferreira",
        "Dushan Hemantha",
        "Dushmantha Chameera",
        "Ebadot Hossain",
        "Eden Carson",
        "Edward Moore",
        "Eimear Richardson",
        "Eliz-Mari Marx",
        "Emma Lamb",
        "Fabian Allen",
        "Faheem Ashraf",
        "Fahima Khatun",
        "Fakhar Zaman",
        "Faraz Akram",
        "Fareed Ahmad",
        "Fargana Hoque",
        "Fariha Trisna",
        "Fatima Sana",
        "Fazalhaq Farooqi",
        "Finn Allen",
        "Fionn Hand",
        "Fran Jonas",
        "Francisca Chipare",
        "Freya Davies",
        "Freya Kemp",
        "Freya Sargent",
        "Gaby Lewis",
        "Gareth Delany",
        "George Dockrell",
        "Georgina Dempsey",
        "Gerald Coetzee",
        "Ghulam Fatima",
        "Glenn Maxwell",
        "Grace Harris",
        "Graham Hume",
        "Gulbadin Naib",
        "Gull Feroza",
        "Gus Atkinson",
        "Habiba Islam",
        "Haider Ali",
        "Hansima Karunaratne",
        "Hardik Pandya",
        "Haris Rauf",
        "Harleen Deol",
        "Harmanpreet Kaur",
        "Harry Brook",
        "Harry Tector",
        "Harshitha Samarawickrama",
        "Hasan Ali",
        "Hasan Mahmud",
        "Hasan Murad",
        "Haseebullah Khan",
        "Hashmatullah Shahidi",
        "Hayley Matthews",
        "Hazratullah Zazai",
        "Heather Graham",
        "Heather Knight",
        "Heinrich Klaasen",
        "Henry Nicholls",
        "Hollie Armitage",
        "Ibrahim Zadran",
        "Iftikhar Ahmed",
        "Ijaz Ahmad Ahmadzai",
        "Ikram Alikhil",
        "Imad Wasim",
        "Imam-ul-Haq",
        "Imesha Dulani",
        "Innocent Kaia",
        "Inoshi Priyadharshani",
        "Iram Javed",
        "Irfan Khan",
        "Isabella Gaze",
        "Ishan Kishan",
        "Jack Leach",
        "Jacob Duffy",
        "Jake Fraser-McGurk",
        "Jaker Ali",
        "James Anderson",
        "James Neesham",
        "Jane Maguire",
        "Janith Liyanage",
        "Jannillea Glasgow",
        "Jason Behrendorff",
        "Jason Holder",
        "Jasprit Bumrah",
        "Jermaine Blackwood",
        "Jess Jonassen",
        "Jess Kerr",
        "Joanna Loughran",
        "Jofra Archer",
        "Johnathan Campbell",
        "Johnson Charles",
        "Jonny Bairstow",
        "Jos Buttler",
        "Josh Clarkson",
        "Josh Hazlewood",
        "Josh Inglis",
        "Josh Little",
        "Joshua Da Silva",
        "Joylord Gumbie",
        "Justin Greaves",
        "Kanika Ahuja",
        "Karabo Meso",
        "Karim Janat",
        "Kate Anderson",
        "Kate Cross",
        "Kavem Hodge",
        "Kavisha Dilhari",
        "Kawya Kavindi",
        "Keacy Carty",
        "Kelis Ndhlovu",
        "Keshav Maharaj",
        "Khaled Ahmed",
        "Khurram Shahzad",
        "Khushdil Shah",
        "Kim Garth",
        "Kirk McKenzie",
        "Kraigg Brathwaite",
        "Kudzai Chigora",
        "Kuldeep Yadav",
        "Kusal Mendis",
        "Kyle Jamieson",
        "Kyle Mayers",
        "Lahiru Kumara",
        "Lahiru Udara",
        "Lance Morris",
        "Lara Goodall",
        "Lasith Croospulle",
        "Lata Mondal",
        "Laura Delany",
        "Lauren Bell",
        "Lauren Cheatle",
        "Lauren Down",
        "Lauren Filer",
        "Leah Paul",
        "Leigh Kasperek",
        "Liam Livingstone",
        "Lindokuhle Mabhero",
        "Litton Das",
        "Lockie Ferguson",
        "Lorcan Tucker",
        "Louise Little",
        "Luke Jongwe",
        "Maddy Green",
        "Mahedi Hasan",
        "Mahika Gaur",
        "Mahmudul Hasan Joy",
        "Mahmudullah",
        "Maia Bouchier",
        "Mannat Kashyap",
        "Marco Jansen",
        "Marizanne Kapp",
        "Mark Adair",
        "Mark Chapman",
        "Marnus Labuschagne",
        "Marufa Akter",
        "Mary Waldron",
        "Mary-Anne Musonda",
        "Masabata Klaas",
        "Matt Henry",
        "Matthew Breetzke",
        "Matthew Forde",
        "Meghna Singh",
        "Mehidy Hasan Miraz",
        "Michael Bracewell",
        "Michael Neser",
        "Michelle Mavunga",
        "Mieke de Ridder",
        "Mikaela Greig",
        "Minnu Mani",
        "Mir Hamza",
        "Mirza Baig",
        "Mitchell Marsh",
        "Modester Mupachikwa",
        "Moeen Ali",
        "Mohammad Amir",
        "Mohammad Haris",
        "Mohammad Ishaq",
        "Mohammad Nabi",
        "Mohammad Naim",
        "Mohammad Nawaz",
        "Mohammad Rizwan",
        "Mohammad Saifuddin",
        "Mohammad Saleem",
        "Mohammad Shahzad",
        "Mohammad Wasim",
        "Mohammed Shami",
        "Mohammed Siraj",
        "Mominul Haque",
        "Mrittunjoy Chowdhury",
        "Mubasir Khan",
        "Mujeeb Ur Rahman",
        "Mukesh Kumar",
        "Muneeba Ali",
        "Murshida Khatun",
        "Mushfiqur Rahim",
        "Mustafizur Rahman",
        "Nadine de Klerk",
        "Nahid Rana",
        "Nahida Akter",
        "Najibullah Zadran",
        "Najiha Alvi",
        "Najmul Hossain Shanto",
        "Nandre Burger",
        "Nangeyalia Kharote",
        "Nasir Jamal",
        "Nasum Ahmed",
        "Nathan Ellis",
        "Nathan Lyon",
        "Naveed Zadran",
        "Naveen-ul-Haq",
        "Nayeem Hasan",
        "Neil Brand",
        "Neil Rock",
        "Nigar Sultana",
        "Nijat Masood",
        "Nishan Madushka",
        "Nishita Akter Nishi",
        "Nonkululeko Mlaba",
        "Noor Ahmad",
        "Noor Ali Zadran",
        "Nurul Hasan",
        "Nuwanidu Fernando",
        "Nyasha Gwanzura",
        "Nyasha Mayavo",
        "Obed McCoy",
        "Orla Prendergast",
        "Ottneil Baartman",
        "Parvez Hossain Emon",
        "Pat Cummins",
        "Patrick Kruger",
        "Paul Stirling",
        "Pellagia Mujaji",
        "Peter Moor",
        "Phoebe Litchfield",
        "Prabath Jayasuriya",
        "Precious Marange",
        "Qais Ahmad",
        "Qiana Joseph",
        "Quinton de Kock",
        "Rabeya Khan",
        "Rahkeem Cornwall",
        "Rahmanullah Gurbaz",
        "Rahmat Shah",
        "Rajeshwari Gayakwad",
        "Rakibul Hasan",
        "Rashi Kanojiya",
        "Rashid Khan",
        "Ravichandran Ashwin",
        "Ravindra Jadeja",
        "Ravindu Fernando",
        "Rebecca Stokell",
        "Reeza Hendricks",
        "Riaz Hassan",
        "Richa Ghosh",
        "Ripon Mondol",
        "Rishabh Pant",
        "Rosemary Mair",
        "Ross Adair",
        "Roston Chase",
        "Ruan de Swardt",
        "Ruturaj Gaikwad",
        "Ryan Burl",
        "Sahan Arachchige",
        "Saika Ishaque",
        "Sam Curran",
        "Sam Hain",
        "Sarah Glenn",
        "Sarfaraz Khan",
        "Scott Boland",
        "Scott Kuggeleijn",
        "Sean Abbott",
        "Sediqullah Atal",
        "Shabika Gajnabi",
        "Shahidullah",
        "Shai Hope",
        "Shamar Joseph",
        "Shamarh Brooks",
        "Shamilia Connell",
        "Shannon Gabriel",
        "Sharafuddin Ashraf",
        "Sharne Mayers",
        "Shashini Gimhani",
        "Shathi Rani",
        "Shemaine Campbelle",
        "Shevon Daniel",
        "Shimron Hetmyer",
        "Shivam Dube",
        "Shreyas Iyer",
        "Sinalo Jafta",
        "Sisanda Magala",
        "Smriti Mandhana",
        "Sobhana Mostary",
        "Sophia Dunkley",
        "Sophie Devine",
        "Sophie Ecclestone",
        "Sophie MacMahon",
        "Sophie Molineux",
        "Spencer Johnson",
        "Srikar Bharat",
        "Stuart Broad",
        "Sugandika Kumari",
        "Sune Luus",
        "Suzie Bates",
        "Tadiwanashe Marumani",
        "Tagenarine Chanderpaul",
        "Tahlia McGrath",
        "Takudzwanashe Kaitano",
        "Tammy Beaumont",
        "Tanaka Chivanga",
        "Tapiwa Mufudza",
        "Tazmin Brits",
        "Teddy Bishop",
        "Temba Bavuma",
        "Tendai Chatara",
        "Theo van Woerkom",
        "Tim David",
        "Tinashe Kamunhukamwe",
        "Todd Murphy",
        "Tom Blundell",
        "Tom Hartley",
        "Tom Latham",
        "Tony Munyonga",
        "Tony de Zorzi",
        "Travis Head",
        "Trent Boult",
        "Trevor Gwandu",
        "Usman Khawaja",
        "Virat Kohli",
        "Vishmi Gunaratne",
        "Vishwa Fernando",
        "Wafadar Momand",
        "Wanindu Hasaranga",
        "Wellington Masakadza",
        "Wessly Madhevere",
        "Will Jacks",
        "Xavier Bartlett",
        "Yannic Cariah",
        "Yashasvi Jaiswal",
        "Yastika Bhatia",
        "Yuzvendra Chahal",
        "Zahir Khan",
        "Zak Crawley",
        "Zakary Foulkes",
        "Zia-ur-Rehman",
        "Zubaid Akbari"
    ];

    const fetchStats = async (name) => {
        try {
            setFetching(true);
            const response = await fetch('http://localhost:5000/api/stats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name })
            });

            if (!response.ok) {
                throw new Error('Unable to fetch stats');
            }

            const data = await response.json();
            console.log(data); // Log the data to see its structure
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setFetching(false);
        }
    };

    const handleFetch = () => {
        if (playerName) {
            fetchStats(playerName);
        }
    };

    const renderTable = (tableData) => {
        if (!Array.isArray(tableData) || tableData.length === 0) {
            return null;
        }
        return (
            <table className="Table">
                <thead>
                    <tr>
                        {tableData[0].map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.slice(1).map((row, index) => (
                        <tr key={index}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const renderStats = () => {
        if (stats === null) {
            return null;
        }

        const image = stats[0]?.Image;
        const playerDetails = stats[1] || {};

        return (
            <div className="player-stats-container">
                {image !== "No image found" && <img src={image} alt="Player" />}
                <h3>Player Name: {playerDetails['Full Name']}</h3>
                <h3>Born: {playerDetails.Born}</h3>
                <h3>Age: {playerDetails.Age}</h3>
                <h3>Playing Role: {playerDetails['Playing Role']}</h3>
                <h3>Batting Style: {playerDetails['Batting Style']}</h3>
                <h3>Bowling Style: {playerDetails['Bowling Style']}</h3>
                {Array.isArray(stats) && stats.slice(2).map((section, index) => (
                    <div key={index} className="Table-stats-container">
                        <h4>{section.paragraph}</h4>
                        {renderTable(section.table)}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <h2>Player Stats</h2>
            <select value={playerName} onChange={(e) => setPlayerName(e.target.value)}>
                <option value="">Select a player</option>
                {players.map((player, index) => (
                    <option key={index} value={player}>{player}</option>
                ))}
            </select>
            <button onClick={handleFetch} disabled={fetching}>Fetch Stats</button>
            {fetching ? <p>Loading...</p> : renderStats()}
        </div>
    );
}
