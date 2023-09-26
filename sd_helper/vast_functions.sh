#source /mnt/c/temp/git_repos/c1earcase/tranq/sd_helper/vast_functions.sh

source ~/venv_3/bin/activate

v_set_instance() {
  vastai show instances | tail -n1 | awk '{print $1}' > /tmp/vast_instance
}

v_start_instance() {
  i=$(head -n 1 /tmp/vast_instance)
  vastai start instance $i
}

v_reboot_instance() {
  i=$(head -n 1 /tmp/vast_instance)
  vastai reboot instance $i
}

v_ssh() {
  i=$(head -n 1 /tmp/vast_instance)
  ssh $(vastai ssh-url $i)
}

