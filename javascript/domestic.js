 const data = [
      {
        img: "../images/garements.jpeg",
        title: "Beautiful Mountains",
        text: " Imagine golden sands stretching endlessly, waves gently kissing the shore, and the soothing sound of the ocean filling the air. The beach is where time slows down. Walking barefoot along the shore, watching seashells scattered across the sand, and feeling the cool breeze makes you forget everything else. The sunsets here are magical—the sky painted in hues of orange, pink, and purple, reflecting on the calm waters. Whether you are alone in search of peace or with friends creating memories, beaches have the power to heal and refresh the human spirit. Sitting by the shore at night, under the stars, you realize how small we are compared to the vastness of the universe.Experience the breathtaking view of the mountains and the freshness of nature."
      },
      {
        img: "../images/agri-commodity.jpeg",
        title: "Wildlife Adventure",
        text: " Imagine golden sands stretching endlessly, waves gently kissing the shore, and the soothing sound of the ocean filling the air. The beach is where time slows down. Walking barefoot along the shore, watching seashells scattered across the sand, and feeling the cool breeze makes you forget everything else. The sunsets here are magical—the sky painted in hues of orange, pink, and purple, reflecting on the calm waters. Whether you are alone in search of peace or with friends creating memories, beaches have the power to heal and refresh the human spirit. Sitting by the shore at night, under the stars, you realize how small we are compared to the vastness of the universe."
      },
      {
        img: "../images/b&c.jpeg",
        title: "City Lights",
        text: " Imagine golden sands stretching endlessly, waves gently kissing the shore, and the soothing sound of the ocean filling the air. The beach is where time slows down. Walking barefoot along the shore, watching seashells scattered across the sand, and feeling the cool breeze makes you forget everything else. The sunsets here are magical—the sky painted in hues of orange, pink, and purple, reflecting on the calm waters. Whether you are alone in search of peace or with friends creating memories, beaches have the power to heal and refresh the human spirit. Sitting by the shore at night, under the stars, you realize how small we are compared to the vastness of the universe.Enjoy the stunning view of cityscapes and modern architecture."
      },
      {
        img: "../images/electronics.jpeg",
        title: "Peaceful Beaches",
        text: " Imagine golden sands stretching endlessly, waves gently kissing the shore, and the soothing sound of the ocean filling the air. The beach is where time slows down. Walking barefoot along the shore, watching seashells scattered across the sand, and feeling the cool breeze makes you forget everything else. The sunsets here are magical—the sky painted in hues of orange, pink, and purple, reflecting on the calm waters. Whether you are alone in search of peace or with friends creating memories, beaches have the power to heal and refresh the human spirit. Sitting by the shore at night, under the stars, you realize how small we are compared to the vastness of the universe.Relax on serene beaches with golden sand and crystal clear waters."
      }
    ];

    let currentIndex = 0;

    function changeSlide(index) {
      currentIndex = index;
      document.getElementById("carouselImage").style.backgroundImage = `url(${data[index].img})`;
      document.getElementById("carouselTitle").innerText = data[index].title;
      document.getElementById("carouselText").innerText = data[index].text;
    }

    // Initialize first slide
    changeSlide(0);