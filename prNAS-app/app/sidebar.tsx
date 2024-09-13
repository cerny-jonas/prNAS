import SidebarButton from "./sidebar_button"

const Sidebar = () => {
  return (
    <div className="flex-none items-stretch md:pr-3 flex flex-col gap-2 justify-start rounded-b-lg md:rounded-bl-none md:rounded-r-xl bg-slate-700/60">
      <SidebarButton href="/dashboard/" title="Dashboard" iconPath="/sidebar_icon.svg" iconAlt="Dashboard Icon" />
      <SidebarButton href="/users/" title="Users" iconPath="/sidebar_icon.svg" iconAlt="User Icon" />
      <SidebarButton href="/storage/" title="Storage Devices" iconPath="/sidebar_icon.svg" iconAlt="Storage Icon" />
      <SidebarButton href="/filebrowser/" title="File Access" iconPath="/sidebar_icon.svg" iconAlt="File Icon" />
      <SidebarButton href="/jellyfin/" title="Jellyfin" iconPath="/sidebar_icon.svg" iconAlt="Media Server Icon" />
      <SidebarButton href="/syncthing/" title="Syncthing" iconPath="/sidebar_icon.svg" iconAlt="File Sync Icon" />
      <SidebarButton href="/nodered/" title="Node-Red Editor" iconPath="/sidebar_icon.svg" iconAlt="Node Red Editor Icon" />
      <SidebarButton href="/ui/" title="Node-Red UI" iconPath="/sidebar_icon.svg" iconAlt="Node Red User Interface Icon" prefetch={false} />
      <SidebarButton href="/logbook/" title="Car Logbook" iconPath="/sidebar_icon.svg" iconAlt="Logbook Icon" />
    </div>
  )
}

export default Sidebar