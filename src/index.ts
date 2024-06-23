import defaultAxios from "redaxios"

const DEBUG_SRV = `https://debug.tscircuit.com`

const axios = defaultAxios.create({
  baseURL: DEBUG_SRV,
})

function findSource(elm: any, sources: Array<any>) {
  if ("source_component_id" in elm) {
    return sources.find(
      (s) =>
        "source_component_id" in s &&
        s.source_component_id === elm.source_component_id &&
        s.type === "source_component"
    )
  }
  if ("source_port_id" in elm) {
    return sources.find(
      (s) =>
        "source_port_id" in s &&
        s.source_port_id === elm.source_port_id &&
        s.type === "source_port"
    )
  }
  return null
}

let layout_server_healthy: boolean | null = null
export const logSoup = async (
  layout_group_name: string,
  objects: Array<any>
) => {
  if (typeof process !== "undefined" && process.env.CI) return
  if (layout_server_healthy === false) return

  if (layout_server_healthy === null) {
    try {
      await axios.get("/api/health", {
        timeout: 5000,
      } as any)
      layout_server_healthy = true
    } catch (e) {
      console.log("layout server unhealthy, not logging soup")
      layout_server_healthy = false
      return
    }
  }

  for (const layout_name of ["all"]) {
    await axios.post("/api/soup_group/add_soup", {
      soup_group_name: layout_group_name,
      soup_name: layout_name,
      username: "tmp",
      content: {
        elements: objects,
      },
    })
  }

  return {
    soup_schematic_url: `${DEBUG_SRV}/soup_group/${layout_group_name}#selected_engine=schematic_renderer`,
    soup_pcb_url: `${DEBUG_SRV}/soup_group/${layout_group_name}#selected_engine=pcb_renderer`,
    soup_pcb_debug_url: `${DEBUG_SRV}/soup_group/${layout_group_name}#selected_engine=debug_renderer`,
  }
}
