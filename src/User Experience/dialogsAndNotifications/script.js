const init = () => {
  const REDIRECT_URL = 'http://dmitrywhite.com';
  const NOTIFICATION_ICON_PATH = 'info.png';
  const PERMISSION_STATUS_GRANTED = 'granted';
  const DIALOG_STATUS_OK = 'Ok';
  const DIALOG_STATUS_CANCEL = 'Cancel';

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

  const isPermissionGranted = () => Notification.permission === PERMISSION_STATUS_GRANTED;
  const redirectHandler = (url) => (event) => {
    event.target.close();
    window.location = url;
  };

  // event handlers to show the dialog as non-modal and modal
  buttonNonModal.addEventListener('click', () => dialog.show());
  buttonModal.addEventListener('click', () => dialog.showModal());

  // add event listeners for the OK and Cancel buttons
  buttonOk.addEventListener('click', () => dialog.open && dialog.close(DIALOG_STATUS_OK));
  buttonCancel.addEventListener('click', () => dialog.open && dialog.close(DIALOG_STATUS_CANCEL));

  // event listeners for the dialog itself - close and cancel
  dialog.addEventListener('close', () => console.log('Dialog closed: ', dialog.returnValue));
  dialog.addEventListener('cancel', () => console.log('Dialog canceled: ', dialog.returnValue));

  buttonRequest.addEventListener('click', () => Notification.requestPermission()
    .then((res) => console.log('Permission granted: ', res)));

  buttonShowBasic.addEventListener('click', () => isPermissionGranted() && new Notification('Basic notification'));

  buttonShowCustom.addEventListener('click', () => {
    if (isPermissionGranted()) {
      // Get the options settings
      const title = notificationTitle.value;
      const body = notificationBody.value;
      const useIcon = notificationIcon.checked;
      const isPersistent = notificationPersist.checked;

      // TODO: Set up the notification options
      const options = {
        body,
        requireInteraction: isPersistent,
        icon: useIcon && NOTIFICATION_ICON_PATH,
      };

      // TODO: Show the notification
      const customNotification = new Notification(title, options);

      // TODO: Handle a click on the notification to open a new page
      customNotification.addEventListener('click', redirectHandler(REDIRECT_URL));
    }
  });
};

window.addEventListener('load', init);
