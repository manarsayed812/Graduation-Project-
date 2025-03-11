// تخزين التعليقات عند التقييم في LocalStorage وعرضها في index.html

document.addEventListener("DOMContentLoaded", function() {
    loadComments();
    document.querySelectorAll(".rating input").forEach(input => {
        input.addEventListener("change", function(event) {
            let ratingValue = event.target.value;
            let placeName = event.target.closest(".content")?.querySelector("h2")?.innerText || "مكان غير معروف";
            if (ratingValue) {
                openCommentBox(ratingValue, document.title, placeName);
            }
        });
    });
});

function openCommentBox(ratingValue, pageType, placeName) {
    closeCommentBox();
    
    let modal = document.createElement("div");
    modal.setAttribute("id", "commentModal");
    modal.innerHTML = `
        <div class="overlay" id="commentOverlay" onclick="closeCommentBox()"></div>
        <div class="comment-box" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            z-index: 1001;
            text-align: center;
            width: 300px;">
            <button onclick="closeCommentBox()" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 20px; cursor: pointer;">X</button>
            <h4>كومنت</h4>
            <textarea id="commentText" placeholder="اكتب تعليقك هنا..." style="width: 100%; height: 80px; margin-bottom: 10px;"></textarea>
            <br>
            <button id="submitCommentBtn" style="background: #007bff; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">إرسال</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById("submitCommentBtn").addEventListener("click", function() {
        submitComment(ratingValue, pageType, placeName);
    });
}

function closeCommentBox() {
    document.getElementById("commentModal")?.remove();
    document.getElementById("commentOverlay")?.remove();
}

function submitComment(rating, pageType, placeName) {
    let commentText = document.getElementById("commentText").value.trim();
    if (!commentText) {
        alert("يرجى إدخال تعليق قبل الإرسال.");
        return;
    }
    
    let commentData = {
        userName: "مستخدم مجهول",
        userImage: "/cairo project/img/user.png",
        rating: rating,
        commentText: commentText,
        location: "اسوان",
        pageType: `${pageType} - ${placeName}`
    };

    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push(commentData);
    localStorage.setItem("comments", JSON.stringify(comments));

    loadComments();
    closeCommentBox();
}

function loadComments() {
    let commentSection = document.getElementById("comments-list");
    if (!commentSection) return;
    commentSection.innerHTML = "";
    
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    if (comments.length === 0) {
        commentSection.innerHTML += "<p class='text-center'>لا توجد تعليقات حتى الآن.</p>";
        return;
    }

    let commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments-container");
    commentsContainer.style.display = "flex";
    commentsContainer.style.flexWrap = "nowrap";
    commentsContainer.style.overflow = "hidden";
    commentsContainer.style.gap = "10px";
    commentsContainer.style.scrollBehavior = "smooth";
    
    comments.forEach((commentData) => {
        let commentCard = document.createElement("div");
        commentCard.classList.add("comment-card");
        commentCard.style.flex = "0 0 auto";
        commentCard.style.width = "300px";
        commentCard.style.border = "1px solid #ddd";
        commentCard.style.borderRadius = "10px";
        commentCard.style.padding = "20px";
        commentCard.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.1)";
        commentCard.style.textAlign = "center";
        commentCard.innerHTML = `
            <div class="d-flex flex-column align-items-center">
                <img src="${commentData.userImage}" alt="User Image" style="width: 50px; height: 50px; border-radius: 50%;">
                <h5 style="margin-top: 10px;">${commentData.userName}</h5>
            </div>
            <div class="rating" style="font-size: 20px; margin: 10px 0; color: gold;">${"★".repeat(commentData.rating)}${"☆".repeat(5 - commentData.rating)}</div>
            <p style="margin: 15px 0; font-size: 16px; font-weight: bold; color: #333;">${commentData.commentText}</p>
            <div class="location" style="margin-top: 10px; color: #666;">المحافظة: ${commentData.location}</div>
            <div class="page-type" style="color: #666;">التصنيف: ${commentData.pageType}</div>
        `;
        commentsContainer.appendChild(commentCard);
    });
    
    commentSection.appendChild(commentsContainer);

    let scrollDirection = 1;
    setInterval(() => {
        if (commentsContainer.scrollLeft + commentsContainer.clientWidth >= commentsContainer.scrollWidth) {
            scrollDirection = -1;
        } else if (commentsContainer.scrollLeft <= 0) {
            scrollDirection = 1;
        }
        commentsContainer.scrollBy({ left: 300 * scrollDirection, behavior: "smooth" });
    }, 3000);
}
