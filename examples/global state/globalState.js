let count = VertoStudio.globalState.myCount || 0;

VertoStudio.alert(`Count is ${count}`);

count++;

//this value will be preserved between script runs
VertoStudio.globalState.myCount = count;