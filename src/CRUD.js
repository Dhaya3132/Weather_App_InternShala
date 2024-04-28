const RecentHistory = document.getElementById('UnOrder-List');
const RecentIcons = document.getElementById('RecentIcon');

RecentIcons.addEventListener('click',()=>{
    RecentHistory.classList.toggle('hidden');
});
