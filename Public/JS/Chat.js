var Socket = io.connect('http://192.168.43.153:6677', {'forceNew':true, 'query':`id=${sessionStorage.getItem('id')}`} );

Socket.on('messages', function (data) {
    console.log(JSON.stringify(data));
    render(data);
    
});

function render(data) {
    var html = data.map(function (message, index) {
        if (message.nickname == sessionStorage.getItem('nombre')) {
    
            return (`
                <div class="message MSGP">
                    <strong>${message.nickname}</strong>
                    <p>${message.text}</p>
                </div>
            `);
            
        }
        else{
            return (`
                <div class="message MSGO">
                    <strong>${message.nickname}</strong>
                    <p>${message.text}</p>
                </div>
            `);
        }
    }).join('   ');
    var div_msg = document.getElementById("messages");
    div_msg.innerHTML = html;
    div_msg.scrollTop = div_msg.scrollHeight;
}

function addMessage(e) {
    var message = {
        nickname: sessionStorage.getItem('nombre'),
        text: document.getElementById('text').value
    };

    Socket.emit('add-message', message);

    
    return false;
}
$('.toast').hide('slow');
document.getElementById('iconChat').addEventListener('click', function () {
    $('.toast').show();
    $( ".toast" ).removeClass( "hidde" ).addClass( "show" );
    $('#iconChat').hide('slow');
    var objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
    
    $('#btnCloseChat').click(function () {
        $( ".toast" ).removeClass( "show" ).addClass( "hidde" );
        $('.toast').hide();
        $('#iconChat').show('slow');
    })
    
    const tx = document.getElementsByTagName('textarea');
    for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
        tx[i].addEventListener("input", OnInput, false);
    }
    
    function OnInput() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    }
})
