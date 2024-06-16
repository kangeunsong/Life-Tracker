const tracks = [
    {
        saying: "나머지 인생을 설탕물이나 팔면서 보내고 싶습니까,<br> 아니면 세상을 바꿔놓을 기회를 갖고 싶습니까?",
        person: "-스티브잡슨-",
    },
    {
        saying: "내일은 우리가 어제로부터 무엇인가 배웠기를 바란다.",
        person: "-존 웨인-",
    },
    {
        saying: "목적없는 공부는 기억에 해가 될 뿐이며,<br> 머리속에 들어온 어떤 것도 간직하지 못한다.",
        person: "-레오나르도 다빈치-",
    },
    {
        saying: "내 어머니는 성취와 성공의 차이를 분명히 하셨다. 어머니는 말씀하셨다.<br> '성취란 네가 열심히 공부하고 일했으며 네가 가진 최선을 다했다는 인식이다.<br> 성공은 남들에게 추앙받는 것이며, 이것이 멋진 일이긴 하나<br> 그렇게 중요하거나 만족을 주는 것은 아니다.<br> 항상 성취를 목적으로 삼고 성공에 대해선 잊어라.'",
        person: "-헬렌 헤이스-",
    },
    {
        saying: "중요한 것은 학습을 중단하지 않고, 도전을 즐기고, 애매모호함을 받아들이는 것이다.<br> 종국에는 확실한 해답은 없기 마련이다.",
        person: "-마티나 호너-",
    },
    {
        saying: "배우나 생각하지 않으면 공허하고, 생각하나 배우지 않으면 위험하다",
        person: "-공자-",
    },
    {
        saying: "어떤 것을 완전히 알려거든 그것을 다른 이에게 가르쳐라.",
        person: "-트라이언 에드워즈-",
    },
];

document.addEventListener("DOMContentLoaded", function() {
    const sayingElement = document.querySelector("#saying");
    const personElement = document.querySelector("#person");

    console.log(sayingElement, personElement);  // 요소가 올바르게 선택되었는지 확인

    if (sayingElement && personElement) {
        function setTrack() {
            let number = Math.floor(Math.random() * tracks.length);
            sayingElement.innerHTML = tracks[number].saying;
            personElement.innerHTML = tracks[number].person;
        }
        setTrack();
    } else {
        console.error("saying 또는 person 요소를 찾을 수 없습니다.");
    }
});
