document.addEventListener('DOMContentLoaded', assignClickHandler)

function assignClickHandler () {

  $(document).ready(function(){
    $("#loadData").on("click", function(){

      $("#enteredRecords").empty();
      $.ajax({
        method: 'GET',
        url: '/users',
        datatype: 'json',
        type: 'get',
        cache: false,
        success: function(data){
          $(data.records).each(function(index,value){
              const id = value.id;
              const date = new Date()
              const time = date.getHours() + ':' + date.getMinutes()
              $('#enteredRecords').append(time +' - '+ value.fullName+', '+' '+value.major+', '+value.startYear+
                '<button value="'+value.id+'" id="delRec">Delete</button><br>');
          });
        }

      });
         
    });
  });

  $(document).ready(function(){
    $("#addRec").on("click", function(){
      const startYear = document.getElementById('startYear').value
      if (startYear < 2000) {
      window.alert('Incorrect year: ' + startYear)
      return
      }
      $.ajax({
        method: 'POST',
        url: '/users/',
        type: 'post',
        cache: false,
        data: {
          fullName: $('#fullName').val(),
          major: $('#major').val(),
          startYear: $('#startYear').val()

        }

      })
      alert("Record added.");
      document.getElementById('inputs').reset()
      
    });

  });

  $(document).on("click","#delRec", function(){

   const id = $(this).val();
   //const fullname = $(this).val();
       
                  $.ajax({
                    url: '/user/'+id,
                    method: 'DELETE',
                    success: function(){
                      alert("The record with id " + id + " has been deleted");
                      reload();
                    },
                    error: function(error){
                      alert(error);
                    }
                  });
                
            })
               
  function reload(){
    $("#enteredRecords").empty();
      $.ajax({
        method: 'GET',
        url: '/users',
        datatype: 'json',
        type: 'get',
        cache: false,
        success: function(data){
          $(data.records).each(function(index,value){
              const id = value.id;
              const date = new Date()
              const time = date.getHours() + ':' + date.getMinutes()
              $('#enteredRecords').append(time +' - '+ value.fullName+', '+' '+value.major+', '+value.startYear+
                '<button value="'+value.id+'" id="delRec">Delete</button><br>');
          });
        }

      });
  }

}