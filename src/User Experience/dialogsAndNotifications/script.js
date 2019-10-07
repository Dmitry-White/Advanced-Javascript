const init = () => {
  const buttonNonModal = document.querySelector('#show1');
  const buttonModal = document.querySelector('#show2');
  const buttonOk = document.querySelector('#okBtn');
  const buttonCancel = document.querySelector('#cancelBtn');
  const dialog = document.querySelector('#dialog1');
  const buttonRequest = document.querySelector('#btnRequest');
  const buttonShowBasic = document.querySelector('#btnShow1');
  const buttonShowCustom = document.querySelector('#btnShow2');
  const notificationTitle = document.querySelector('#notTitle');
  const notificationBody = document.querySelector('#notBody');
  const notificationIcon = document.querySelector('#notIcon');
  const notificationPersist = document.querySelector('#notPersist');

  // event handlers to show the dialog as non-modal and modal
  buttonNonModal.addEventListener('click', () => {
    // TODO: Show the dialog using the non-modal API

  });
  buttonModal.addEventListener('click', () => {
    // TODO: Show the dialog using the modal API

  });

  // add event listeners for the OK and Cancel buttons
  buttonOk.addEventListener('click', () => {
    // TODO: Check to see if the dialog is in fact open, if so then close it with "OK"
  });
  buttonCancel.addEventListener('click', () => {
    // TODO: Check to see if the dialog is in fact open, if so then close it with "Cancel"
  });

  // event listeners for the dialog itself - close and cancel
  dialog.addEventListener('close', () => console.log('Dialog closed: ', dialog.returnValue));
  dialog.addEventListener('cancel', () => console.log('Dialog canceled: ', dialog.returnValue));

  buttonRequest.addEventListener('click', () => {
    // TODO: Request notifications permission from the user

  });

  buttonShowBasic.addEventListener('click', () => {
    // TODO: check to make sure we have permission to show notifications

  });

  buttonShowCustom.addEventListener('click', () => {
    if (Notification.permission === 'granted') {
      // Get the options settings
      const title = notificationTitle.value;
      const body = notificationBody.value;
      const useIcon = notificationIcon.checked;
      const isPersistent = notificationPersist.checked;

      // TODO: Set up the notification options


      // TODO: Show the notification


      // TODO: Handle a click on the notification to open a new page
    }
  });
};

window.addEventListener('load', init);
