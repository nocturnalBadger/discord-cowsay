function parsing(input) //constructor expects the mesage comeing in minus the cowsay at the begining
{
  var cmd = input.split(' '); //splits the input up at space for prossessing
  for (var i = 1; i < cmd.length; i++)
  { //putting my { on the corect line like a civilised person
	if (cmd[i].startsWith('-')//if comands
	{
	  if (cmd[i].startsWith('-e')) //if eye
	  {
	  	if(cmd[i].localeCompare('-e') == 0)//if eye
  	  	{
	  		eyes = cmd[i + 1];
		  	i += 1;
  		}
	  	else
		{
			eyes = cmd[i].substring('-e'.length);
		}
	  }
	  else if (cmd[i].startsWith('-f')) //if cow
	  {
	  	if(cmd[i].localeCompare('-f') == 0)
	  	{
	  		cow = cmd[i + 1];
	  		i += 1;
	  	}
  		else
  		{
  			cow = cmd[i].substring('-f'.length);
  		}
  	}
  	else if (cmd[i].startsWith('-T')) //if tongue
  	{
  		if(cmd[i].localeCompare('-T') == 0)
  		{
  			tongue = cmd[i + 1];
  			i += 1;
  		}
  		else
  		{
  			tongue = cmd[i].substring('-T'.length);
  		}
  	}
  	else if (cmd[i].startsWith('-W')) //if wrapLength
  	{
  		if(cmd[i].localeCompare('-W') == 0)
  		{
  			wrapLength = parseInt(cmd[i + 1]);
  			i += 1;
  		}
  		else
  		{
  			wrapLength = parseInt(cmd[i].substring('-W'.length));
  		}
  	}
  	else if (cmd[i].localeCompare('-b') == 0) //if b mode
  	{
  		mode = 'b';
  	}
  	else if (cmd[i].localeCompare('-d') == 0) //if d mode
  	{
  		mode = 'd';
  	}
  	else if (cmd[i].localeCompare('-g') == 0) //if g mode
  	{
  		mode = 'g';
  	}
  	else if (cmd[i].localeCompare('-p') == 0) //if p mode
  	{
  		mode = 'p';
  	}
  	else if (cmd[i].localeCompare('-s') == 0) //if s mode
  	{
  		mode = 's';
  	}
  	else if (cmd[i].localeCompare('-t') == 0) //if t mode
  	{
  		mode = 't';
  	}
  	else if (cmd[i].localeCompare('-w') == 0) //if w mode
  	{
  		mode = 'w';
  	}
  	else if (cmd[i].localeCompare('-y') == 0) //if y mode
  	{
  		mode = 'y';
  	}
  	else if (cmd[i].localeCompare('-n') == 0) //if wrap
  	{
  		wrap = true;
  	}
  	else //if not a comand then it adds it to the message
  	{
  		text += cmd[i] + ' ';
  	}
	//proboly should have uesd a case statement but what ever
     }else
     {
	   text += cmd[i] + ' ';
     }
  }
  text = text.slice(0, -1)
}
//setting up vars
var text;
var cow;
var eyes;
var tongue;
var wrap;
var wrapLength;
var mode;
//end of setting up vars
