export function useFormContact() {
  const formContact = document.querySelector('.contact')!;
  formContact.getAttribute('data-activity') === 'inactive'
    ? formContact.setAttribute('data-activity', 'active')
    : formContact.setAttribute('data-activity', 'inactive');
}
