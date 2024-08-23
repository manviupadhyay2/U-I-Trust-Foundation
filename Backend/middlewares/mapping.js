

const students = [
    {
        "what_to_learn": "I think he is weaker in basic math",
        "how_to_learn": "I learn best through practice exercises",
        "language": "English"
    },
    {
        "what_to_learn": "I want to learn advanced algebra and calculus.",
        "how_to_learn": "I prefer interactive sessions with lots of examples.",
        "language": "Spanish"
    },
    {
        "what_to_learn": "I need to improve my English writing skills.",
        "how_to_learn": "I like to read and write essays.",
        "language": "English"
    },
    {
        "what_to_learn": "I want to master data science and machine learning.",
        "how_to_learn": "I prefer hands-on projects and coding exercises.",
        "language": "English"
    }
];

const teachers = [
    {
        "what_to_teach": "I teach math",
        "how_to_teach": "I use interactive methods and provide many examples.",
        "language": "English"
    },
    {
        "what_to_teach": "I specialize in Spanish language and grammar.",
        "how_to_teach": "I focus on practice exercises to reinforce learning.",
        "language": "Spanish"
    },
    {
        "what_to_teach": "I can help with English writing and grammar.",
        "how_to_teach": "I prefer reading and writing assignments.",
        "language": "English"
    },
    {
        "what_to_teach": "I teach data science and machine learning.",
        "how_to_teach": "I emphasize hands-on projects and coding exercises.",
        "language": "English"
    }
];

const data = {
    students: students,
    teachers: teachers
};


const transformArray = (array) => {
    
    //console.log(JSON.stringify(array));
    return array.map(item => {
        console.log(JSON.stringify(Object.keys(item)));
      return { what_to_learn: item._doc.sessionHistory[0].feedback ,name:item.name,language:item._doc.lang};
    });
  };
  const transformArray1 = (array) => {
    return array.map(item => {
        console.log(JSON.stringify(Object.keys(item._doc)),"hjsdb");
      return { what_to_teach: item._doc.des ,name:item._doc.name,language:item._doc.lang};
    });
  };



const mapping = async(volunteer,students)=>{
    volunteer=transformArray1(volunteer);
    students=transformArray(students);
    console.log(volunteer,students);
    return new Promise(async(resolve,reject)=>{
        try{
        const res=await fetch("http://localhost:5000/match",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const resn=await res.json();
        console.log(JSON.stringify(resn));
        resn['matches'].map((item,index)=>{
            console.log(JSON.stringify(students[item[0]])+"-"+JSON.stringify(volunteer[item[1][0]])+","+JSON.stringify(volunteer[item[1][1]]));
        });
        resolve(res);
    }catch(err){
        console.log(err);
        reject(err);
    }
});
}

module.exports=mapping;